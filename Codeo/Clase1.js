class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  NombreCompleto() {
    return `El nombre completo es: ${this.nombre} ${this.apellido}`;
  }

  AgregarMascota(NombredeMascota) {
    const Mascota = NombredeMascota;
    this.mascotas.push(Mascota);
  }

  // Función que retorna la cantidad de mascotas del usuario.
  NumMascotas() {
    return this.mascotas.length;
  }

  // Función que agrega un libro al array.
  AgregarLibros(autor, libro) {
    const newBook = { autor: autor, libro: libro };
    this.libros.push(newBook);
  }

  // Función que retorna un array con los nombres de los libros.
  NombredeLibros() {
    const NombreDeLibro = this.libros.map((book) => book.libro);
    return NombreDeLibro;
  }
}

const usuario1 = new Usuario(
  "Facundo",
  "Balbuena",
  [
    { autor: "Stephen King", libro: "Después" },
    { autor: "Nietzsche Friedrich", libro: "EL OCASO DE LOS IDOLOS O COMO SE FILOSOFA A MARTILLAZOS" },
  ],
  ["Roco", "Rola"]
);