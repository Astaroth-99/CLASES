const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  save = async (product) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
        if (contenido) {
          const productos = JSON.parse(contenido);
          const lastIdAdded = productos.reduce(
            (acc, item) => (item.id > acc ? (acc = item.id) : acc),
            0
          );
          const newProduct = {
            id: lastIdAdded + 1,
            ...product,
          };
          productos.push(newProduct);
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(productos, null, 2)
          );
        }
        else {
          const newProduct = {
            id: 1,
            ...product,
          };
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newProduct], null, 2)
          );
        }
      }
      else {
        const newProduct = {
          id: 1,
          ...product,
        };
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([newProduct], null, 2)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (id) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
        if (contenido) {
          const productos = JSON.parse(contenido);
          const producto = productos.find((item) => item.id === id);
          return producto;
        } else {
          return "El archivo está vacío";
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      const productos = JSON.parse(contenido);
      return productos;
    } catch (err) {
      console.log(err);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  };

  deleteById = async (id) => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      const productos = JSON.parse(contenido);
      const newProducts = productos.filter((item) => item.id !== id);
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (err) {
      console.log(err);
    }
  };
}

const listaProductos = new Contenedor("./productos.txt");

const product1 = {
  title: "TEE TEDDYBEAR ©2022",
  price: 6500,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/022/845/products/web1111-1f7caf1f36ea03910216635391102983-320-0.jpg",
};

const product2 = {
  title: "CHANCLAS SUNSHINE ©2022",
  price: 9000,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/022/845/products/web151-6d353652cd6d5b391016635387136043-320-0.jpg",
};

const product3 = {
  title: "SHORT SUMMERLEAGUE BLACK",
  price: 8200,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/022/845/products/web311-b291f6045a0e1bc92316642151393422-320-0.jpg",
};

const product4 = {
  title: "HOODIE FUNNYBUSINESS ©2022",
  price: 16500,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/022/845/products/web241-7d5eb4acbc0e326c2516635399903349-320-0.jpg",
};

const crearProducto = async () => {
  await listaProductos.save(product1);
  await listaProductos.save(product2);
  await listaProductos.save(product3);
  await listaProductos.save(product4);
  const productos1 = await listaProductos.getAll();
  console.log("Los productos son: ", productos1);
  const searchId1 = await listaProductos.getById(3);
  console.log(searchId1);
  await listaProductos.deleteById(1);
  const productos2 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos2);
  await listaProductos.save(product3);
  const productos3 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos3);
  await listaProductos.deleteAll();
  const productos4 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos4);
};

crearProducto();