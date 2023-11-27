export const API_URL = "https://juandiederewicki-001-site1.atempurl.com/api/";

// ================================ INSCRIPCIÓN ================================
export const usuariosEP = {
  getall: "Usuarios",
  getById: "Usuarios/",
  post: "Usuarios",
};

export const noticiasEP = {
  getall: "Noticias",
  getById: "Noticias/ObtenerNoticiasPorId/",
  post: "Noticias",
};

export const comentariosEP = {
  getall: "Comentarios",
  getById: "Comentarios/ObtenerComentariosPorId/",
  post: "Comentarios/AgregarComentario",
};

export const inscripcionEP = {
  getall: "SolicitudInscripcion",
  getById: "SolicitudInscripcion/ObtenerSolicitudesPorId/",
  post: "SolicitudInscripcion/AgregarSolicitud",
};
