export const verifyEmail = (value: string) => {
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value == "") {
    return { status: false, error: "Email requerido" };
  }

  if (!patronEmail.test(value)) {
    return { status: false, error: "El Email ingresado no es válido" };
  }

  return { status: true, error: "" };
};

export const verifyName = (value: string) => {
  if (value == "") {
    return { status: false, error: "Nombre requerido" };
  }

  return { status: true, error: "" };
};

export const verifyMonto = (value: string) => {
  if (value == "") {
    return { status: false, error: "Monto requerido" };
  }

  return { status: true, error: "" };
};

export const verifyConcepto = (value: string) => {
  if (value == "") {
    return { status: false, error: "Concepto requerido" };
  }

  return { status: true, error: "" };
};

export const verifyLastName = (value: string) => {
  if (value == "") {
    return { status: false, error: "Apellido requerido" };
  }

  return { status: true, error: "" };
};

export const verifyTel = (value: string) => {
  const patronNumero = /^([1-9]\d{1,3})?\s?[1-9]\d{5}$/;

  if (value == "") {
    return { status: false, error: "Teléfono requerido" };
  }

  if (!patronNumero.test(value)) {
    return { status: false, error: "El teléfono ingresado no es válido" };
  }

  return { status: true, error: "" };
};

export const verifyPassword = (value: string) => {
  if (value == "") {
    return { status: false, error: "Contraseña requerida" };
  }

  if (value.includes(" ")) {
    return { status: false, error: "La contraseña no debe incluir espacios" };
  }

  if (
    !/[A-Z]/.test(value) ||
    !/[\!@#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\<\>\?\,\.\/\\;:'"`~]/.test(value) ||
    value.length <= 8
  ) {
    return {
      status: false,
      error:
        "Debe posseer al menos 8 caracteres, 1 letra mayúscula y 1 caracter especial",
    };
  }

  return { status: true, error: "" };
};

export const verifyDNI = (value: string) => {
  if (value == "") {
    return { status: false, error: "DNI requerido" };
  }

  if (value.length > 8) {
    return { status: false, error: "El DNI no debe tener más de 8 caracteres" };
  }

  return { status: true, error: "" };
};

export const verifyCalificacion = (value: string) => {
  if (value == "") {
    return { status: false, error: "DNI requerido" };
  }

  if (value.length > 2) {
    return {
      status: false,
      error: "La calificación no debe tener más de 2 caracteres",
    };
  }

  return { status: true, error: "" };
};
