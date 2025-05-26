import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'node-xlsx';
import { ProductType } from '../entities/ProductType';
import { MaterialType } from '../entities/MaterialType';
import { Product } from '../entities/Product';
import { Material } from '../entities/Material';
import { ProductMaterial } from '../entities/ProductMaterial';

export class ImportData1722000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const importsDir = path.join(__dirname, '../imports');

    // Импорт Product_Types
    const productTypeFile = path.join(importsDir, 'Product_type_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;
    productTypeData.shift();
    const productTypeMap: { [type: string]: ProductType } = {};
    for (const row of productTypeData) {
      const [type, coefficientStr] = row;
      const productType = new ProductType();
      productType.type = type as string;
      productType.coefficient = parseFloat(coefficientStr as string);
      await queryRunner.manager.save(productType);
      productTypeMap[type as string] = productType;
    }

    // Импорт Material_Types
    const materialTypeFile = path.join(importsDir, 'Material_type_import.xlsx');
    const materialTypeSheets = xlsx.parse(fs.readFileSync(materialTypeFile));
    const materialTypeData = materialTypeSheets[0].data;
    materialTypeData.shift();
    const materialTypeMap: { [type: string]: MaterialType } = {};
    for (const row of materialTypeData) {
      const [type, defectPercentageStr] = row;
    const materialType = new MaterialType();
      materialType.type = type as string;
      materialType.defectPercentage = parseFloat(defectPercentageStr as string);
      await queryRunner.manager.save(materialType);
      materialTypeMap[type as string] = materialType;
    }

    // Импорт Products
    const productsFile = path.join(importsDir, 'Products_import.xlsx');
    const productsSheets = xlsx.parse(fs.readFileSync(productsFile));
    const productsData = productsSheets[0].data;
    productsData.shift();
    const productMap: { [id: number]: Product } = {};
    for (const row of productsData) {
      const [productTypeStr, name, idStr, minCostStr, rollWidthStr] = row;
      const product = new Product();
      product.id = parseInt(idStr as string);
      product.name = name as string;
      product.minCost = parseFloat(minCostStr as string);
      product.rollWidth = parseFloat(rollWidthStr as string);
      const productType = productTypeMap[productTypeStr as string];
      if (!productType) {
        throw new Error(`ProductType not found for ${productTypeStr}`);
      }
      product.productType = productType;
      await queryRunner.manager.save(product);
      productMap[product.id] = product;
    }

    // Импорт Materials
    const materialsFile = path.join(importsDir, 'Materials_import.xlsx');
    const materialsSheets = xlsx.parse(fs.readFileSync(materialsFile));
    const materialsData = materialsSheets[0].data;
    materialsData.shift();
    const materialMap: { [name: string]: Material } = {};
    for (const row of materialsData) {
      const [name, materialTypeStr, priceStr, stockStr, minStockStr, packSizeStr, unit] = row;
      const material = new Material();
      material.name = name as string;
      const materialType = materialTypeMap[materialTypeStr as string];
      if (!materialType) {
        throw new Error(`MaterialType not found for ${materialTypeStr}`);
      }
      material.materialType = materialType;
      material.price = parseFloat(priceStr as string);
      material.stock = parseFloat(stockStr as string);
      material.minStock = parseFloat(minStockStr as string);
      material.packSize = parseInt(packSizeStr as string);
      material.unit = unit as string;
      await queryRunner.manager.save(material);
      materialMap[material.name] = material;
    }

    // Импорт Product_Materials
    const productMaterialsFile = path.join(importsDir, 'Product_materials_import.xlsx');
    const productMaterialsSheets = xlsx.parse(fs.readFileSync(productMaterialsFile));
    const productMaterialsData = productMaterialsSheets[0].data;
    productMaterialsData.shift();
    for (const row of productMaterialsData) {
      const [productIdStr, materialName, requiredAmountStr] = row;
      const productId = parseInt(productIdStr as string);
      const requiredAmount = parseFloat(requiredAmountStr as string);
      const product = productMap[productId];
      if (!product) {
        throw new Error(`Product not found for id ${productId}`);
      }
      const material = materialMap[materialName as string];
      if (!material) {
        throw new Error(`Material not found for name ${materialName}`);
      }
      const productMaterial = new ProductMaterial();
      productMaterial.product = product;
      productMaterial.material = material;
      productMaterial.requiredAmount = requiredAmount;
      await queryRunner.manager.save(productMaterial);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "product_material"`);
    await queryRunner.query(`DELETE FROM "product"`);
    await queryRunner.query(`DELETE FROM "material"`);
    await queryRunner.query(`DELETE FROM "material_type"`);
    await queryRunner.query(`DELETE FROM "product_type"`);
  }
}