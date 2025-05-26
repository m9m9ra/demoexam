import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import xlsx from 'node-xlsx';
import { ProductType } from '../entity/ProductType';
import { MaterialType } from '../entity/MaterialType';
import { Product } from '../entity/Product';
import { AppDataSource } from '../config/data-source';
import { Materia } from '../entity/Material';
import { ProductMaterial } from '../entity/ProductMaterial';

export class ImportData1722000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "product_material"`);
    await queryRunner.query(`DELETE FROM "product"`);
    await queryRunner.query(`DELETE FROM "material"`);
    await queryRunner.query(`DELETE FROM "material_type"`);
    await queryRunner.query(`DELETE FROM "product_type"`);
  }
}

export class migrate {
  // Импорт Product_Types
  public async productType() {
    const importsDir = path.join(__dirname, '../../assets');
    const productTypeRepository = AppDataSource.getRepository(ProductType);

    const productTypeFile = path.join(importsDir, 'Product_type_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;

    productTypeData.shift();
    let bufferProductType: Array<any> = [];

    for (const row of productTypeData) {
      // console.log(row);
      const productType = Object.assign(new ProductType, {
        type: row[0],
        coefficient: row[1]
      });
      bufferProductType.push(productType);
    }
    // console.log(bufferProductType);
    // for (const prType of bufferProductType) {
    //   await productTypeRepository.save(prType);
    // }
    // console.log(await productTypeRepository.find());
  }


  // Импорт Material_Types
  public async materialType() {
    const importsDir = path.join(__dirname, '../../assets');

    const productTypeFile = path.join(importsDir, 'Material_type_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;

    productTypeData.shift();
    let bufferMaterialType: Array<any> = [];

    for (const row of productTypeData) {
      // console.log(row);
      const materialType = Object.assign(new MaterialType, {
        type: row[0],
        defectPercentage: row[1]
      });
      bufferMaterialType.push(materialType);
    }

    // console.log(bufferMaterialType);

    // for (const matType of bufferMaterialType) {
    //   await AppDataSource.getRepository(MaterialType).save(matType);
    // }
    // console.log(await AppDataSource.getRepository(MaterialType).find());
  }

  // Импорт Material
  public async material() {
    const importsDir = path.join(__dirname, '../../assets');
    const materialTypeList = await AppDataSource.getRepository(MaterialType).find();

    const productTypeFile = path.join(importsDir, 'Materials_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;

    productTypeData.shift();
    let bufferMaterial: Array<any> = [];

    for (const row of productTypeData) {
      // console.log(row);
      for (const matType of materialTypeList) {
        if (matType.type == row[1]) {
          const material = Object.assign(new Materia, {
            name: row[0],
            materialType: matType,
            price: row[2],
            stock: row[3],
            minStock: row[4],
            packSize: row[5],
            unit: row[6],
          });
          bufferMaterial.push(material);
        }
      }
    }

    // for (const material of bufferMaterial) {
    //   await AppDataSource.getRepository(Materia).save(material);
    // }
    // console.log(await AppDataSource.getRepository(Materia).find());
  }

  // Импорт Product
  public async product() {
    const importsDir = path.join(__dirname, '../../assets');
    const productTypeList = await AppDataSource.getRepository(ProductType).find();

    const productTypeFile = path.join(importsDir, 'Products_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;

    productTypeData.shift();
    let bufferProduct: Array<any> = [];

    for (const row of productTypeData) {
      // console.log(row);
      for (const productType of productTypeList) {
        if (productType.type == row[0]) {
          const product = Object.assign(new Product, {
            productType: productType,
            name: row[1],
            article: row[2],
            minCost: row[3],
            rollWidth: row[4],
          });
          bufferProduct.push(product);
        }
      }
    }

    // console.log(bufferProduct);
    // for (const product of bufferProduct) {
    //   await AppDataSource.getRepository(Product).save(product);
    // }

    // console.log(await AppDataSource.getRepository(Product).find({
    //   relations: {
    //     productType: true
    //   }
    // }));

  }

  // Импорт Product
  public async productMaterial() {
    const importsDir = path.join(__dirname, '../../assets');

    const productList = await AppDataSource.getRepository(Product).find();
    const materialList = await AppDataSource.getRepository(Materia).find();

    const productTypeFile = path.join(importsDir, 'Product_materials_import.xlsx');
    const productTypeSheets = xlsx.parse(fs.readFileSync(productTypeFile));
    const productTypeData = productTypeSheets[0].data;

    productTypeData.shift();

    let bufferProductMaterial: Array<any> = [];

    for (const row of productTypeData) {
      // console.log(row);
      for (const product of productList) {
        if (product.name == row[0]) {
          for (const material of materialList) {
            if (material.name == row[1]) {
              const productMaterial = Object.assign(new ProductMaterial, {
                product: product,
                material: material,
                requiredAmount: row[2],
              });
              bufferProductMaterial.push(productMaterial);
            }
          }
        }
      }
    }

    console.log(bufferProductMaterial);

    // for (const productMaterial of bufferProductMaterial) {
    //   await AppDataSource.getRepository(ProductMaterial).save(productMaterial);
    // }

    console.log(await AppDataSource.getRepository(ProductMaterial).find({
      relations: {
        product: {
          productType: true
        },
        material: {
          materialType: true
        }
      }
    }))

  }
}