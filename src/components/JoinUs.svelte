<script lang="ts">
  import type { IFormData } from "../lib/types";

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxSVrMb17wpEAjAMofXOt3GKVQPrco1TwTjgnSNwYeCgBxNWsV-iQGJAfU4zONr16kV/exec";
  const initialFormState: IFormData = {
    nombres: "",
    apellidos: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    birthDate: "",
    email: "",
    phone: "",
    skillLevel: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    honeypot: "",
  };
  let formData: IFormData = { ...initialFormState };
  let errors: { [key: string]: string | null } = {};
  let isMinor = false;
  let successMessage = "";
  let isSubmitting = false;

  const calculateAge = (dateString: string): number => {
    if (!dateString) return NaN;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  $: {
    const age = calculateAge(formData.birthDate);
    isMinor = age >= 0 && age < 18;
  }

  const validateField = (name: string, value: string) => {
    let error = "";
    const requiredFieldsForAdult = ["email", "phone"];
    const requiredFieldsForMinor = [
      "guardianName",
      "guardianPhone",
      "guardianEmail",
    ];
    const allRequired = [
      "nombres",
      "apellidos",
      "tipoIdentificacion",
      "numeroIdentificacion",
      "birthDate",
      "skillLevel",
    ];

    const isRequired =
      allRequired.includes(name) ||
      (isMinor && requiredFieldsForMinor.includes(name)) ||
      (!isMinor && formData.birthDate && requiredFieldsForAdult.includes(name));

    if (isRequired && (!value || value.trim() === "")) {
      return "Este campo es obligatorio.";
    }

    if (!value) return "";

    switch (name) {
      case "nombres":
      case "apellidos":
      case "guardianName":
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value))
          error = "Este campo solo admite letras y espacios.";
        break;
      case "email":
      case "guardianEmail":
        if (!/^[\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Por favor, introduce un correo válido.";
        break;
      case "phone":
      case "guardianPhone":
        if (!/^\d{10}$/.test(value))
          error = "El teléfono debe tener 10 dígitos numéricos.";
        break;
      case "numeroIdentificacion":
        if (!/^\d{1,10}$/.test(value))
          error = "La identificación debe ser numérica y de máximo 10 dígitos.";
        break;
      case "birthDate":
        const age = calculateAge(value);
        if (age < 7) error = "El atleta debe tener al menos 7 años.";
        break;
    }
    return error;
  };

  const handleChange = (
    e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }
  ) => {
    const { name, value } = e.currentTarget;
    if (["nombres", "apellidos", "guardianName"].includes(name)) {
      const sanitizedValue = value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, "");
      formData = { ...formData, [name]: sanitizedValue };
    } else {
      formData = { ...formData, [name]: value };
    }

    if (errors[name]) {
      errors = { ...errors, [name]: null };
    }
  };

  const handleBlur = (
    e: FocusEvent & { currentTarget: HTMLInputElement | HTMLSelectElement }
  ) => {
    const { name, value } = e.currentTarget;
    const error = validateField(name, value);
    if (error) {
      errors = { ...errors, [name]: error };
    }
  };

  const handleSubmit = async () => {
    successMessage = "";

    if (formData.honeypot) return;

    const newErrors: { [key: string]: string | null } = {};
    Object.keys(formData).forEach((key) => {
      if (key === "honeypot") return;
      const error = validateField(
        key,
        formData[key as keyof IFormData] as string
      );
      if (error) newErrors[key] = error;
    });

    errors = newErrors;

    if (Object.keys(newErrors).length === 0) {
      isSubmitting = true;
      const dataToSend = { ...formData, formType: "joinUs" };
      if (dataToSend?.honeypot) delete dataToSend.honeypot;

      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(dataToSend),
        });
        const result = await response.json();

        if (result.result === "success") {
          successMessage = "¡Su prerregistro se ha enviado con éxito!";
          formData = initialFormState;
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

  $: requiredMap = {
    nombres: true,
    apellidos: true,
    tipoIdentificacion: true,
    numeroIdentificacion: true,
    birthDate: true,
    email: !isMinor && !!formData.birthDate,
    phone: !isMinor && !!formData.birthDate,
    guardianName: isMinor,
    guardianPhone: isMinor,
    guardianEmail: isMinor,
    skillLevel: true,
  };
</script>

<div class="container">
  <h2>Únete a nuestro Club</h2>
  <div class="registration-form-container">
    <form
      class="modern-form"
      id="registration-form"
      novalidate
      on:submit|preventDefault={handleSubmit}>
      {#if successMessage}
        <div class="success-message">{successMessage}</div>
      {/if}
      {#if errors.submit}
        <div
          class="error-message"
          style="text-align: center; margin-bottom: 1rem;"
        >
          {errors.submit}
        </div>
      {/if}
      <div class="age-notice">
        <i class="fas fa-info-circle"></i>
        <p>
          Únete a nuestra pasión por la natación. Estamos listos para recibir a
          nadadores a partir de los 7 años de edad y acompañarlos en su camino
          al éxito.
        </p>
      </div>

      <div class="honeypot-field">
        <label for="honeypot-join">Please leave this field empty</label>
        <input
          type="text"
          id="honeypot-join"
          name="honeypot"
          bind:value={formData.honeypot}
          tabindex="-1"
          autocomplete="off" />
      </div>

      <fieldset>
        <legend>Datos del Atleta</legend>
        <div class="form-grid">
          <div class="form-group">
            <label
              for="nombres"
              data-label-for="nombres"
              data-required={requiredMap.nombres}>
              Nombres
            </label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="nombres"
                name="nombres"
                placeholder="Ej: Valentina"
                bind:value={formData.nombres}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.nombres} />
            </div>
            {#if errors.nombres}
              <div class="error-message">{errors.nombres}</div>
            {/if}
          </div>
          <div class="form-group">
            <label
              for="apellidos"
              data-label-for="apellidos"
              data-required={requiredMap.apellidos}>
              Apellidos
            </label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="Ej: Ortiz"
                bind:value={formData.apellidos}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.apellidos} />
            </div>
            {#if errors.apellidos}
              <div class="error-message">{errors.apellidos}</div>
            {/if}
          </div>
          <div class="form-group">
            <label
              for="tipoIdentificacion"
              data-label-for="tipoIdentificacion"
              data-required={requiredMap.tipoIdentificacion}>
              Tipo de Identificación
            </label>
            <div class="input-wrapper">
              <i class="fas fa-id-card"></i>
              <select
                id="tipoIdentificacion"
                name="tipoIdentificacion"
                bind:value={formData.tipoIdentificacion}
                on:change={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.tipoIdentificacion}>
                <option value="" disabled> Selecciona un tipo </option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="RC">Registro Civil</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>
            {#if errors.tipoIdentificacion}
              <div class="error-message">{errors.tipoIdentificacion}</div>
            {/if}
          </div>
          <div class="form-group">
            <label
              for="numeroIdentificacion"
              data-label-for="numeroIdentificacion"
              data-required={requiredMap.numeroIdentificacion}>
              Número de Identificación
            </label>
            <div class="input-wrapper">
              <i class="fas fa-hashtag"></i>
              <input
                type="tel"
                id="numeroIdentificacion"
                name="numeroIdentificacion"
                placeholder="Ej: 1020..."
                maxlength="10"
                bind:value={formData.numeroIdentificacion}
                on:input={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.numeroIdentificacion} />
            </div>
            {#if errors.numeroIdentificacion}
              <div class="error-message">{errors.numeroIdentificacion}</div>
            {/if}
          </div>
          <div class="form-group">
            <label
              for="birthDate"
              data-label-for="birthDate"
              data-required={requiredMap.birthDate}>
              Fecha de Nacimiento
            </label>
            <div class="input-wrapper">
              <i class="fas fa-calendar-alt"></i>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                bind:value={formData.birthDate}
                on:change={handleChange}
                on:blur={handleBlur}
                class:is-invalid={errors.birthDate} />
            </div>
            {#if errors.birthDate}
              <div class="error-message">{errors.birthDate}</div>
            {/if}
          </div>
          {#if !isMinor && formData.birthDate}
            <div class="form-group">
              <label
                for="email"
                data-label-for="email"
                data-required={requiredMap.email}>
                Correo Electrónico
              </label>
              <div class="input-wrapper">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  bind:value={formData.email}
                  on:input={handleChange}
                  on:blur={handleBlur}
                  class:is-invalid={errors.email} />
              </div>
              {#if errors.email}
                <div class="error-message">{errors.email}</div>
              {/if}
            </div>
            <div class="form-group">
              <label
                for="phone"
                data-label-for="phone"
                data-required={requiredMap.phone}>
                Teléfono de Contacto
              </label>
              <div class="input-wrapper">
                <i class="fas fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="310 123 4567"
                  maxlength="10"
                  bind:value={formData.phone}
                  on:input={handleChange}
                  on:blur={handleBlur}
                  class:is-invalid={errors.phone} />
              </div>
              <div class="form-hint">Solo números, 10 dígitos.</div>
              {#if errors.phone}
                <div class="error-message">{errors.phone}</div>
              {/if}
            </div>
          {/if}
        </div>
      </fieldset>

      <fieldset>
        <legend
          class="sub-legend"
          data-label-for="skillLevel"
          data-required="true">
          Nivel de habilidad
        </legend>
        <p>Selecciona el nivel actual del atleta.</p>
        <div class="skill-level-group" class:is-invalid={errors.skillLevel}>
          {#each ["principiante", "intermedio", "avanzado"] as level}
            <input
              type="radio"
              name="skillLevel"
              id={`skill-${level}`}
              value={level}
              class="skill-radio"
              bind:group={formData.skillLevel} />
            <label for={`skill-${level}`} class="skill-card">
              <i
                class={`fas ${
                  level === "principiante"
                    ? "fa-swimmer"
                    : level === "intermedio"
                    ? "fa-water"
                    : "fa-trophy"
                }`}></i>
              <h3>{level.charAt(0).toUpperCase() + level.slice(1)}</h3>
              <span>
                {level === "principiante"
                  ? "Iniciación y fundamentos."
                  : level === "intermedio"
                  ? "Técnica y resistencia."
                  : "Nivel competitivo."}
              </span>
            </label>
          {/each}
        </div>
        {#if errors.skillLevel}
          <div class="error-message">{errors.skillLevel}</div>
        {/if}
      </fieldset>

      {#if isMinor && formData.birthDate}
        <fieldset id="guardian-info">
          <legend>Datos del Representante</legend>
          <div class="form-grid">
            <div class="form-group">
              <label
                for="guardianName"
                data-label-for="guardianName"
                data-required={requiredMap.guardianName}>
                Nombre del Representante
              </label>
              <div class="input-wrapper">
                <i class="fas fa-user-shield"></i>
                <input
                  type="text"
                  id="guardianName"
                  name="guardianName"
                  bind:value={formData.guardianName}
                  on:input={handleChange}
                  on:blur={handleBlur}
                  class:is-invalid={errors.guardianName} />
              </div>
              {#if errors.guardianName}
                <div class="error-message">{errors.guardianName}</div>
              {/if}
            </div>
            <div class="form-group">
              <label
                for="guardianPhone"
                data-label-for="guardianPhone"
                data-required={requiredMap.guardianPhone}>
                Teléfono del Representante
              </label>
              <div class="input-wrapper">
                <i class="fas fa-mobile-alt"></i>
                <input
                  type="tel"
                  id="guardianPhone"
                  name="guardianPhone"
                  maxlength="10"
                  bind:value={formData.guardianPhone}
                  on:input={handleChange}
                  on:blur={handleBlur}
                  class:is-invalid={errors.guardianPhone} />
              </div>
              <div class="form-hint">Solo números, 10 dígitos.</div>
              {#if errors.guardianPhone}
                <div class="error-message">{errors.guardianPhone}</div>
              {/if}
            </div>
            <div class="form-group">
              <label
                for="guardianEmail"
                data-label-for="guardianEmail"
                data-required={requiredMap.guardianEmail}>
                Correo del Representante
              </label>
              <div class="input-wrapper">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  id="guardianEmail"
                  name="guardianEmail"
                  placeholder="representante@correo.com"
                  bind:value={formData.guardianEmail}
                  on:input={handleChange}
                  on:blur={handleBlur}
                  class:is-invalid={errors.guardianEmail} />
              </div>
              {#if errors.guardianEmail}
                <div class="error-message">{errors.guardianEmail}</div>
              {/if}
            </div>
          </div>
        </fieldset>
      {/if}

      <div class="submit-container">
        <button type="submit" class="btn btn-submit" disabled={isSubmitting}>
          {#if isSubmitting}
            Enviando...
          {:else}
            Enviar Prerregistro <i class="fas fa-paper-plane"></i>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
