<script lang="ts">
  import type { IContactFormData } from "../lib/types";
  import { clubData } from "../lib/data";

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxSVrMb17wpEAjAMofXOt3GKVQPrco1TwTjgnSNwYeCgBxNWsV-iQGJAfU4zONr16kV/exec";
  const initialFormState: IContactFormData = {
    contactName: "",
    contactEmail: "",
    honeypot: "",
  };
  let formData: IContactFormData = { ...initialFormState };
  let message = "";
  let errors: { [key: string]: string | null } = {};
  let successMessage = "";
  let isSubmitting = false;

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value || value.trim() === "") return "Este campo es obligatorio.";
    if (name === "contactName" && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value)) {
      error = "Este campo solo admite letras y espacios.";
    } else if (
      name === "contactEmail" &&
      !/^[\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Por favor, introduce un correo válido.";
    }
    return error;
  };

  const handleChange = (
    e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "message") {
      message = value;
      if (errors.message) errors = { ...errors, message: null };
    } else {
      formData = { ...formData, [name]: value };
      if (errors[name]) errors = { ...errors, [name]: null };
    }
  };

  const handleBlur = (
    e: FocusEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }
  ) => {
    const { name, value } = e.currentTarget;
    const error = validateField(name, value);
    if (error) errors = { ...errors, [name]: error };
  };

  const handleSubmit = async () => {
    successMessage = "";

    if (formData.honeypot) return;

    const newErrors: { [key: string]: string | null } = {};
    Object.keys(formData).forEach((key) => {
      if (key === "honeypot") return;
      const error = validateField(
        key,
        formData[key as keyof IContactFormData] as string
      );
      if (error) newErrors[key] = error;
    });

    if (!message || message.trim() === "") {
      newErrors.message = "Este campo es obligatorio.";
    }

    errors = newErrors;

    if (Object.keys(newErrors).length === 0) {
      isSubmitting = true;
      const dataToSend = {
        ...formData,
        message,
        formType: "contact",
      };
      delete (dataToSend as any).honeypot;

      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(dataToSend),
        });
        const result = await response.json();

        if (result.result === "success") {
          successMessage = "Tu mensaje se ha enviado con éxito.";
          formData = initialFormState;
          message = "";
          errors = {};
        } else {
          throw new Error(
            result.error || "Ocurrió un error al enviar el formulario."
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        errors = {
          submit:
            "No se pudo enviar el formulario. Por favor, inténtalo más tarde.",
        };
      } finally {
        isSubmitting = false;
      }
    }
  };
</script>

<div class="container">
  <h2>Contacto</h2>
  <div class="contact-grid">
    <div class="contact-info-container">
      <div class="contact-info-box">
        <h3>Ponte en Contacto</h3>
        <div class="phone-numbers-container">
          {#each clubData.contacto.telefonos as tel}
            <p>
              <i class="fab fa-whatsapp"></i>
              <a
                href={tel.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer">
                {tel.numero}
              </a>
            </p>
          {/each}
        </div>
        <p>
          <i class="fas fa-envelope"></i>
          <a href={`mailto:${clubData.contacto.email}`}>{clubData.contacto.email}</a>
        </p>
        <div class="original-social-section">
          <h3>Síguenos</h3>
          <div class="social-links">
            {#each Object.entries(clubData.contacto.redesSociales) as [key, value]}
              <div class="social-link-wrapper">
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={value.nombre}
                  class={key}>
                  <i class={`fab fa-${key}`}></i>
                </a>
                <div class="tooltip">{value.nombre}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="contact-info-box">
        <h3>Nuestras Sedes</h3>
        <div class="locations-list">
          {#each clubData.ubicacion.sedes as sede}
            <div class="location-item">
              <div class="location-item-header">
                <div>
                  <h4>{sede.nombre}</h4>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    {sede.direccion}
                  </p>
                </div>
                <a
                  href={sede.mapa_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-map">
                  <span>Ir a Maps</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="contact-form-container">
      <h3>Envíanos un mensaje</h3>
      <form
        class="modern-form contact-form"
        novalidate
        on:submit|preventDefault={handleSubmit}>
        {#if successMessage}
          <div class="success-message">{successMessage}</div>
        {/if}
        {#if errors.submit}
          <div
            class="error-message"
            style="text-align: center; margin-bottom: 1rem;">
            {errors.submit}
          </div>
        {/if}

        <div class="honeypot-field">
          <label for="honeypot-contact">Please leave this field empty</label>
          <input
            type="text"
            id="honeypot-contact"
            name="honeypot"
            bind:value={formData.honeypot}
            tabindex="-1"
            autocomplete="off" />
        </div>

        <div class="contact-fields">
          <div class="form-group">
            <label
              for="contactName"
              data-label-for="contactName"
              data-required="true">
              Nombre
            </label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="contactName"
                name="contactName"
                placeholder="Tu nombre"
                bind:value={formData.contactName}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.contactName} />
            </div>
            {#if errors.contactName}
              <div class="error-message">{errors.contactName}</div>
            {/if}
          </div>
          <div class="form-group">
            <label
              for="contactEmail"
              data-label-for="contactEmail"
              data-required="true">
              Correo Electrónico
            </label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="Tu correo electrónico"
                bind:value={formData.contactEmail}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.contactEmail} />
            </div>
            {#if errors.contactEmail}
              <div class="error-message">{errors.contactEmail}</div>
            {/if}
          </div>
          <div class="form-group contact-form-message">
            <label for="message" data-label-for="message" data-required="true"
              >Mensaje</label>
            <div class="input-wrapper" class:is-invalid={errors.message}>
              <i class="fas fa-pencil-alt"></i>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                bind:value={message}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.message}></textarea>
            </div>
            {#if errors.message}
              <div class="error-message">{errors.message}</div>
            {/if}
          </div>
          <button type="submit" class="btn btn-submit" disabled={isSubmitting}>
            {#if isSubmitting}
              Enviando...
            {:else}
              Enviar Mensaje <i class="fas fa-paper-plane"></i>
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
