import xlsx from 'node-xlsx';
import { ProductType } from '../entity/ProductType';
import { AppDataSource } from '../config/data-source';
import { Product } from '../entity/Product';
import { Partner } from '../entity/Partner';
import { SalesHistory } from '../entity/SalesHistory';
import { MaterialType } from '../entity/MaterialType';

export const migrate = async () => {
    // await migratePartner();
    // await migrateProductType();
    // await migrateProduct();
    // await migrateSalesHisory();
    // await migrateMaterialType();
};

const migratePartner = async () => {
    // migrate
    const partnerXLSX = xlsx.parse('assets/Partners_import.xlsx');
    let clenaParnter: Array<any> = partnerXLSX[0].data.slice(1, partnerXLSX[0].data.length);

    clenaParnter = clenaParnter.map((value: Array<any>) => {
        console.log(value);
        console.log('\n');
        return Object.assign(new Partner, {
            partner_name: value[1],
            partner_type: value[0],
            rating: value[7],
            address: value[5],
            director_name: value[2],
            phone: value[4],
            email: value[3],
        })
    });
    console.log(clenaParnter);
    // const productRepository = AppDataSource.getRepository(Product);
    const partnerRepository = AppDataSource.getRepository(Partner);

    // migrate
    clenaParnter.forEach(async (patner: Partner ) => {
        await partnerRepository.save(patner);
    });
    console.log(await partnerRepository.find());
}

const migrateProductType = async () => {
    const data = xlsx.parse('assets/Product_type_import.xlsx');
    let clenaArr: Array<any> = data[0].data.slice(1, data[0].data.length);
    clenaArr = clenaArr.map((value: Array<any>) => {
        console.log(value);
        console.log('\n');
        if (value[0] === undefined) {
            return
        }
        return Object.assign(new ProductType, {
            product_type_name: String(value[0]),
            coefficient: value[1]
        })
    });
    clenaArr.forEach(async (prType: ProductType) => {
        if (prType === undefined) {
            return;
        }
        console.log(prType);
        await AppDataSource.getRepository(ProductType).save(prType);
    });
    console.log(await AppDataSource.getRepository(ProductType).find());
}

const migrateProduct = async () => {
    const productS = xlsx.parse('assets/Products_import.xlsx');
    let productList = productS[0].data.slice(1, productS[0].data.length);
    const productTypeList = await AppDataSource.getRepository(ProductType).find();
    let bufferProductList: Array<Product> = [];
    productList.forEach((product) => {
        productTypeList.forEach((prType) => {
            if (product[0] == prType.product_type_name) {
                const newProduct = Object.assign(new Product, {
                    product_name: product[1],
                    product_type_id: prType.product_type_id,
                    quantity_in_stock: 10,
                    price: product[3],
                    product_type: prType
                });
                bufferProductList.push(newProduct);
            }
        });
    });
    bufferProductList.forEach(async (pr: Product) => {
        await AppDataSource.getRepository(Product).save(pr);
    });

    console.log(await AppDataSource.getRepository(Product).find({
        relations: {
            product_type: true
        }
    }));
}

const migrateSalesHisory = async () => {
    const sales = xlsx.parse('assets/Partner_products_import.xlsx', {
        type: "buffer",
        cellDates: true,
        cellHTML: false,
        dateNF: "yyyy-mm-dd hh:mm:ss",
        cellNF: true
    });
    let salesList = sales[0].data.slice(1, sales[0].data.length);
    console.log(salesList);

    const prList = await AppDataSource.getRepository(Product).find();
    const partherList = await AppDataSource.getRepository(Partner).find();

    let bufferSalesList: Array<SalesHistory> = [];

    salesList.forEach(async (rawData) => {
        partherList.forEach(async (partner: Partner) => {
            if (partner.partner_name == rawData[1]) {
                prList.forEach(async (product: Product) => {
                    if (product.product_name == rawData[0]) {
                        const sales = Object.assign(new SalesHistory, {
                            partner_id: partner.partner_id,
                            product_id: product.product_id,
                            quantity: rawData[2],
                            sale_date: rawData[3],
                            partner: partner,
                            product: product,
                        });
                        bufferSalesList.push(sales);
                    }
                });
            }
        });
    });
    console.log(bufferSalesList);

    bufferSalesList.forEach(async (sale: SalesHistory) => {
        await AppDataSource.getRepository(SalesHistory).save(sale);
    });

    console.log(await AppDataSource.getRepository(SalesHistory).find({
        relations: {
            partner: true,
            product: true
        }
    }));
}

const migrateMaterialType = async () => {
    const material = xlsx.parse('assets/Material_type_import.xlsx');
    let materialList = material[0].data.slice(1, material[0].data.length);
    let bufferMaterialTypeList: Array<MaterialType> = [];
    materialList.forEach(async (rawData) => {
        const newMaterialType = Object.assign(new MaterialType, {
            material_type_name: rawData[0],
            defect_percentage: rawData[1]
        })
        bufferMaterialTypeList.push(newMaterialType);
    });

    bufferMaterialTypeList.forEach(async (materialT: MaterialType) => {
        await AppDataSource.getRepository(MaterialType).save(materialT);
    })

    console.log(await AppDataSource.getRepository(MaterialType).find());

}