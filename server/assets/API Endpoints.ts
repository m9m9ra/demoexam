import express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';
import { ProductType } from '../entities/ProductType';
import { Material } from '../entities/Material';
import { MaterialType } from '../entities/MaterialType';
import { ProductMaterial } from '../entities/ProductMaterial';

const router = express.Router();

// GET /products - Просмотр списка продукции
router.get('/products', async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find({ relations: ['productType'] });
  res.json(products);
});

// POST /products - Добавление нового продукта
router.post('/products', async (req: Request, res: Response) => {
  const { productType, name, minCost, rollWidth } = req.body;
  const productTypeRepository = AppDataSource.getRepository(ProductType);
  const productTypeEntity = await productTypeRepository.findOneByOrFail({ type: productType });

  const product = new Product();
  product.id = Date.now(); // Простой способ генерации ID, можно заменить на автоинкремент
  product.productType = productTypeEntity;
  product.name = name;
  product.minCost = parseFloat(minCost);
  product.rollWidth = parseFloat(rollWidth);

  const productRepository = AppDataSource.getRepository(Product);
  await productRepository.save(product);
  res.status(201).json(product);
});

// PUT /products/:id - Редактирование продукта
router.put('/products/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { productType, name, minCost, rollWidth } = req.body;
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOneByOrFail({ id });

  const productTypeRepository = AppDataSource.getRepository(ProductType);
  product.productType = await productTypeRepository.findOneByOrFail({ type: productType });
  product.name = name;
  product.minCost = parseFloat(minCost);
  product.rollWidth = parseFloat(rollWidth);

  await productRepository.save(product);
  res.json(product);
});

// GET /products/:id/materials - Просмотр списка материалов для продукта
router.get('/products/:id/materials', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const productMaterialRepository = AppDataSource.getRepository(ProductMaterial);
  const materials = await productMaterialRepository.find({
    where: { product: { id } },
    relations: ['material', 'material.materialType'],
  });
  res.json(materials.map(pm => ({
    materialName: pm.material.name,
    requiredAmount: pm.requiredAmount,
    materialType: pm.material.materialType.type,
    defectPercentage: pm.material.materialType.defectPercentage,
  })));
});

// GET /products/:id/cost - Расчет стоимости продукта
router.get('/products/:id/cost', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const productMaterialRepository = AppDataSource.getRepository(ProductMaterial);
  const materials = await productMaterialRepository.find({
    where: { product: { id } },
    relations: ['material'],
  });

  let totalCost = 0;
  for (const pm of materials) {
    totalCost += pm.requiredAmount * pm.material.price;
  }

  res.json({ cost: totalCost.toFixed(2) });
});

// GET /materials/required/:productId/:materialType/:quantity/:param1/:param2/:stock - Расчет необходимого количества материала
router.get('/materials/required/:productId/:materialType/:quantity/:param1/:param2/:stock', async (req: Request, res: Response) => {
  const { productId, materialType, quantity, param1, param2, stock } = req.params;
  const quantityNum = parseInt(quantity);
  const param1Num = parseFloat(param1);
  const param2Num = parseFloat(param2);
  const stockNum = parseFloat(stock);

  if (quantityNum < 0 || param1Num < 0 || param2Num < 0 || stockNum < 0) {
    res.json({ requiredAmount: -1 });
    return;
  }

  const productTypeRepository = AppDataSource.getRepository(ProductType);
  const productType = await productTypeRepository.findOneBy({ type: materialType });
  if (!productType) {
    res.json({ requiredAmount: -1 });
    return;
  }

  const materialTypeRepository = AppDataSource.getRepository(MaterialType);
  const materialTypeEntity = await materialTypeRepository.findOneBy({ type: materialType });
  if (!materialTypeEntity) {
    res.json({ requiredAmount: -1 });
    return;
  }

  const baseAmount = param1Num * param2Num * productType.coefficient * quantityNum;
  const defectFactor = 1 + (materialTypeEntity.defectPercentage / 100);
  const totalRequired = Math.ceil(baseAmount * defectFactor);
  const requiredAmount = Math.max(0, totalRequired - stockNum);

  res.json({ requiredAmount });
});

export default router;