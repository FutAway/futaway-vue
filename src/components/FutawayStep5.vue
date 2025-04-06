<template>
  <div class="step5-container">
    <!-- Título principal y subtítulo -->
    <h2 class="main-title">DATOS DE LA RESERVA</h2>
    <p class="subtitle">
      Introduce solo los datos del jugón principal y rellena el resto una vez confirmada la reserva.
    </p>

    <div class="spacer-large"></div>

    <!-- Sección 1: Jugón Principal - Adulto -->
    <div class="section-block">
      <div class="section-title">
        <i class="pi pi-star"></i>
        JUGÓN PRINCIPAL - ADULTO
      </div>
      <hr class="divider" />
      <div class="field-row">
        <div class="field-col">
          <label>Nombre</label>
          <input type="text" v-model="formData.nombre" placeholder="Tu nombre" />
        </div>
        <div class="field-col">
          <label>Apellidos</label>
          <input type="text" v-model="formData.apellidos" placeholder="Tus apellidos" />
        </div>
      </div>
      <div class="field-row">
        <div class="field-col-prefix">
          <label>Teléfono</label>
          <div class="phone-group">
            <select class="prefix" v-model="formData.prefijo">
              <option value="+1">+1</option>
              <option value="+34">+34</option>
              <option value="+44">+44</option>
              <option value="+49">+49</option>
              <!-- Agrega más prefijos si es necesario -->
            </select>
            <input type="text" class="phone" v-model="formData.telefono" placeholder="Número" />
          </div>
        </div>
        <div class="field-col">
          <label>Correo electrónico</label>
          <input type="email" v-model="formData.email" placeholder="ejemplo@correo.com" />
        </div>
      </div>
    </div>

    <!-- Sección 2: Resumen de la experiencia -->
    <div class="section-block">
      <div class="section-title">
        <i class="pi pi-align-justify"></i>
        RESUMEN DE TU RESERVA
      </div>
      <hr class="divider" />
      <div class="summary-container">
        <h3 class="summary-header">EXPERIENCIA FUTAWAY</h3>
        <hr class="divider" />
        <div class="checkin-checkout-row">
          <div class="checkin">
            <div class="checkin-content">
              <i class="pi pi-caret-right"></i>
              <strong>CHECK-IN:</strong>
              <div>{{ formattedStartDate }}</div>
            </div>
          </div>
          <div class="separator-vertical"></div>
          <div class="checkout">
            <div class="checkout-content">
              <i class="pi pi-caret-left"></i>
              <strong>CHECK-OUT:</strong>
              <div>{{ formattedEndDate }}</div>
            </div>
          </div>
        </div>
        <hr class="divider" />
        <div class="summary-titles-row">
          <div class="col-label left-col">TU VIAJE</div>
          <div class="col-label">PRECIO</div>
          <div class="col-label">CANT.</div>
          <div class="col-label">TOTAL</div>
        </div>
        <div v-for="line in summaryLines" :key="line.label" class="summary-line">
          <div class="col-text">{{ line.label }}</div>
          <div class="col-number">{{ line.priceUnit }}€</div>
          <div class="col-number">x{{ line.quantity || 1 }}</div>
          <div class="col-number">{{ line.priceTotal }}€</div>
        </div>
        <hr class="divider" />
        <div class="summary-total">
          <div class="total-label">TOTAL A PAGAR:</div>
          <div class="total-price">{{ finalPrice }}€</div>
        </div>
      </div>
    </div>

    <!-- Sección 3: Observaciones -->
    <div class="section-block">
      <div class="section-title">
        <i class="pi pi-comment"></i>
        OBSERVACIONES
      </div>
      <hr class="divider" />
      <textarea class="observations" v-model="formData.observaciones" placeholder="Escribe aquí cualquier observación adicional que quieras hacer."></textarea>
    </div>

    <!-- Sección 4: Métodos de pago -->
    <div class="section-block">
      <div class="section-title">
        <i class="pi pi-money-bill"></i>
        MÉTODOS DE PAGO
      </div>
      <hr class="divider" />
      <div class="payment-methods">
        <div v-for="pmethod in paymentMethods" :key="pmethod.id" class="payment-method">
          <label class="payment-label">
            <input type="radio" :value="pmethod.id" v-model="selectedMethod" />
            <div class="payment-info">
              <div class="payment-title">
                <i :class="['pi', paymentIcon(pmethod.id)]"></i>
                <strong>{{ pmethod.title }}</strong>
              </div>
              <div class="payment-desc">
                {{ pmethod.desc }}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Casilla de Términos y Condiciones -->
    <div class="accept-terms">
      <label>
        <input type="checkbox" v-model="acceptedTerms" />
        Acepto los Términos y Condiciones y la Política de Privacidad
      </label>
    </div>

    <!-- CTA final: Dos botones centrados -->
    <div class="cta-row">
      <!-- NUEVO => Emitimos "goPrevStep" para volver atrás si se quiere -->
      <button class="btn-back" @click="$emit('goPrevStep')">Atrás</button>
      <button class="btn-confirm" @click="goToPayment">Realizar pago</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FutawayStep5",
  props: {
    wizardData: {
      type: Object,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: {
        nombre: "",
        apellidos: "",
        prefijo: "+34",
        telefono: "",
        email: "",
        observaciones: ""
      },
      paymentMethods: [
        {
          id: "tarjeta",
          title: "Pago con tarjeta",
          desc: "Sin comisiones ni gastos de gestión. El TPV aparecerá en el siguiente paso."
        },
        {
          id: "paypal",
          title: "PayPal",
          desc: "Te llevaremos a la plataforma PayPal."
        },
        {
          id: "transferencia",
          title: "Transferencia Bancaria",
          desc: "Al confirmar, te daremos los datos para hacer la transferencia."
        }
      ],
      selectedMethod: null,
      acceptedTerms: false
    };
  },
  computed: {
    formattedStartDate() {
      if (!this.wizardData.startDate) return "";
      const parts = this.wizardData.startDate.split("-");
      return `${parts[2]}/${parts[1]}`;
    },
    formattedEndDate() {
      if (!this.wizardData.endDate) return "";
      const parts = this.wizardData.endDate.split("-");
      return `${parts[2]}/${parts[1]}`;
    },
    summaryLines() {
      const persons = Number(this.wizardData.personas) || 0;
      let lines = [];
      if (persons > 0) {
        const basePrice = persons === 1 ? 250 : 200;
        lines.push({
          label: "Experiencia FutAway",
          priceUnit: basePrice,
          quantity: persons || 1,
          priceTotal: basePrice * persons
        });
      }
      const dias = Number(this.wizardData.dias);
      if (dias === 2) {
        const cost = persons === 1 ? 30 : 0;
        lines.push({
          label: "1 noche",
          priceUnit: cost,
          quantity: persons || 1,
          priceTotal: cost * persons
        });
      } else if (dias === 3) {
        const cost = 60;
        lines.push({
          label: "2 noches",
          priceUnit: cost,
          quantity: persons || 1,
          priceTotal: cost * persons
        });
      } else if (dias === 4) {
        const cost = 120;
        lines.push({
          label: "3 noches",
          priceUnit: cost,
          quantity: persons || 1,
          priceTotal: cost * persons
        });
      }
      if (this.wizardData.jornada !== "") {
        const jornadaLabel =
          this.wizardData.jornada === "sinvierneslunes" ? "Sin viernes ni lunes" : "Jornada completa";
        const jornadaCost = this.wizardData.jornada === "sinvierneslunes" ? 25 : 0;
        lines.push({
          label: jornadaLabel,
          priceUnit: jornadaCost,
          quantity: persons || 1,
          priceTotal: jornadaCost * persons
        });
      }
      if (this.wizardData.hotel !== "") {
        const hotelLabel = this.wizardData.hotel === "superior" ? "Hotel Superior" : "Hotel Estándar";
        const hotelCost = this.wizardData.hotel === "superior" ? 40 : 0;
        lines.push({
          label: hotelLabel,
          priceUnit: hotelCost,
          quantity: persons || 1,
          priceTotal: hotelCost * persons
        });
      }
      {
        const desayunoLabel = this.wizardData.desayuno ? "Desayuno incluido" : "Desayuno no incluido";
        const desayunoCost = this.wizardData.desayuno ? 6 : 0;
        lines.push({
          label: desayunoLabel,
          priceUnit: desayunoCost,
          quantity: persons || 1,
          priceTotal: desayunoCost * persons
        });
      }
      const totalDesc = this.wizardData.descartes?.length || 0;
      const freeQty = Math.min(totalDesc, 3);
      if (freeQty > 0) {
        lines.push({
          label: "Destinos descartados gratis",
          priceUnit: 0,
          quantity: freeQty,
          priceTotal: 0
        });
      }
      const extraQty = totalDesc - freeQty;
      if (extraQty > 0) {
        lines.push({
          label: "Destinos descartados (extra)",
          priceUnit: 6,
          quantity: extraQty,
          priceTotal: 6 * extraQty
        });
      }
      return lines;
    }
  },
  methods: {
    goToPayment() {
      if (!this.acceptedTerms || !this.selectedMethod) {
        alert("Selecciona un método de pago y acepta los Términos y Condiciones.");
        return;
      }
      alert(`Realizando pago con: ${this.selectedMethod}`);
    },
    paymentIcon(methodId) {
      if (methodId === "tarjeta") return "pi-credit-card";
      if (methodId === "paypal") return "pi-paypal";
      if (methodId === "transferencia") return "pi-building-columns";
      return "pi-credit-card";
    }
  }
};
</script>

<style scoped>
.step5-container {
  width: 50%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

/* Títulos */
.main-title {
  font-weight: bold;
  font-size: 2.6rem;
  margin-bottom: 5px;
  text-align: center;
}
.subtitle {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 15px;
  text-align: center;
}

/* Espaciador */
.spacer-large {
  height: 20px;
}

/* Secciones */
.section-block {
  margin-bottom: 30px;
}
.section-title {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-family: 'Zuume Edge', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}
.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}

/* Campos */
.field-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}
.field-col,
.field-col-prefix {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.field-col label,
.field-col-prefix label {
  font-weight: 600;
  margin-bottom: 4px;
}
.field-col input,
.field-col-prefix input,
.field-col-prefix select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
.phone-group {
  display: flex;
  gap: 5px;
}
.phone-group .prefix {
  width: 50px;
  text-align: center;
}
.phone-group .phone {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Resumen */
.summary-container {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 20px;
  background-color: #fafafa;
  margin: 0 20px;
}
.summary-header {
  font-weight: bold;
  font-size: 2.8rem;
  margin: 0 0 5px 0;
  text-align: left;
}
.checkin-checkout-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.separator-vertical {
  width: 1px;
  height: 40px;
  background-color: #ccc;
}
.checkin,
.checkout {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkin-content,
.checkout-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.icon-check {
  font-size: 1.2rem;
}
.summary-titles-row {
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  gap: 5px;
  margin-bottom: 5px;
  align-items: center;
}
.summary-titles-row .col-label {
  font-family: 'Zuume Edge', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 2px;
  padding: 5px 0;
  text-align: center;
}
.left-col {
  text-align: left;
}
.summary-line {
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  gap: 5px;
  font-size: 0.9rem;
  margin-bottom: 5px;
}
.col-text {
  text-align: left;
}
.col-number {
  text-align: center;
}
.summary-total {
  text-align: right;
  margin-top: 10px;
}
.total-label {
  font-family: 'Zuume Edge', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 10px;
}
.total-price {
  font-family: 'Zuume Edge', sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  display: inline-block;
  margin-left: 5px;
}

/* Observaciones */
.observations {
  width: 100%;
  min-height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px;
  resize: vertical;
}

/* Métodos de pago */
.payment-method {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.payment-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
}
.payment-label input[type="radio"] {
  margin-top: 5px;
}
.payment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.payment-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
}
.payment-title i {
  font-size: 0.9rem;
}
.method-desc {
  font-size: 0.75rem;
  color: #555;
}

/* Casilla T&C */
.accept-terms {
  text-align: center;
  margin-bottom: 20px;
}
.accept-terms label {
  cursor: pointer;
  font-size: 0.9rem;
}

/* CTA row final */
.cta-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.btn-back {
  background-color: #ffef98;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
}
.btn-confirm {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .step5-container {
    width: 90%;
  }
  .field-row {
    flex-direction: column;
  }
  .summary-line,
  .summary-titles-row {
    grid-template-columns: 40% 20% 20% 20%;
  }
}
</style>