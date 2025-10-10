export interface IClubData {
    clubInfo:          ClubInfo;
    valoresIntro:      string;
    valores:           Valore[];
    entrenadores:      Entrenadore[];
    atletasDestacados: AtletasDestacado[];
    galeria:           IGaleria[];
    logros:            Logro[];
    avales:            Avale[];
    aliados:           Aliado[];
    ubicacion:         Ubicacion;
    contacto:          Contacto;
}

export interface Aliado {
    nombre:   string;
    logo_url: string;
}

export interface AtletasDestacado {
    id:       number;
    nombre:   string;
    logros:   string;
    foto_url: string;
}

export interface Avale {
    nombre:         string;
    logo_url:       string;
    url:            string;
    special_class?: string;
}

export interface ClubInfo {
    nombre:       string;
    nombreCorto:  string;
    lema:         string;
    logo_url:     string;
    quienesSomos: string;
    mision:       string;
    vision:       string;
    historia:     string[];
}

export interface Contacto {
    telefonos:     Telefono[];
    email:         string;
    redesSociales: RedesSociales;
}

export interface RedesSociales {
    facebook:  Facebook;
    instagram: Facebook;
    tiktok:    Facebook;
}

export interface Facebook {
    url:    string;
    nombre: string;
}

export interface Telefono {
    numero:       string;
    whatsapp_url: string;
}

export interface Entrenadore {
    nombre:      string;
    foto_url:    string;
    descripcion: string;
}

export interface IGaleria {
    nombre: string;
    fotos:  string[];
}

export interface Logro {
    titulo:      string;
    descripcion: string;
    foto_url:    string;
}

export interface Ubicacion {
    sedes: Sede[];
}

export interface Sede {
    nombre:    string;
    direccion: string;
    mapa_url:  string;
}

export interface Valore {
    titulo:      string;
    descripcion: string;
}

export interface IFormData {
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  birthDate: string;
  email: string;
  phone: string;
  skillLevel: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  honeypot?: string;
}

export interface IContactFormData {
  contactName: string;
  contactEmail: string;
  honeypot?: string;
}
