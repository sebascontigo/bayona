import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { planConversionMessages } from '../config/conversionContent.js'
import {
  buildExperienceWhatsAppUrl,
  calculateExperience,
  extraServices,
  formatCop,
  membershipPlans,
  serviceCategoryDefinitions,
  sessionServices,
} from '../config/offerings.js'

const EXTRA_GROUPS = serviceCategoryDefinitions
  .filter(({ id }) => id !== 'CLASES')
  .map(({ id, title, promise }) => ({
    category: id,
    title,
    promise,
    services: extraServices.filter((service) => service.category === id),
  }))

export default function PlanCalculator() {
  const [planId, setPlanId] = useState(membershipPlans[0].id)
  const [serviceQuantities, setServiceQuantities] = useState({})
  const [extraIds, setExtraIds] = useState([])

  const selection = useMemo(
    () => ({ planId, serviceQuantities, extraIds }),
    [planId, serviceQuantities, extraIds],
  )
  const calculation = useMemo(() => calculateExperience(selection), [selection])
  const whatsappUrl = useMemo(() => buildExperienceWhatsAppUrl(selection), [selection])
  const servicesTotal = calculation.totalCop - calculation.plan.priceCop
  const selectedItems = [
    ...calculation.sessions
      .filter((service) => service.quantity > 0)
      .map((service) => ({
        id: service.id,
        label: `${service.quantity} × ${service.label}`,
        subtotalCop: service.subtotalCop,
      })),
    ...calculation.extras.map((service) => ({
      id: service.id,
      label: service.label,
      subtotalCop: service.subtotalCop,
    })),
  ]
  const conversionMessage = planConversionMessages[planId]
  const hasAddedServices = selectedItems.length > 0

  const updateQuantity = (serviceId, quantity) => {
    setServiceQuantities((current) => ({ ...current, [serviceId]: Number(quantity) }))
  }

  const toggleExtra = (extraId) => {
    setExtraIds((current) => current.includes(extraId)
      ? current.filter((id) => id !== extraId)
      : [...current, extraId])
  }

  return (
    <div className="experience-calculator">
      <div className="calculator-form">
        <fieldset className="calculator-fieldset calculator-plan-step">
          <legend><span>01</span> Elige tu plan base</legend>
          <div className="calculator-plan-options">
            {membershipPlans.map((plan) => (
              <label key={plan.id} className={planId === plan.id ? 'is-selected' : ''}>
                <input
                  type="radio"
                  name="calculator-plan"
                  value={plan.id}
                  checked={planId === plan.id}
                  onChange={(event) => setPlanId(event.target.value)}
                />
                <span>
                  <strong>{plan.name}</strong>
                  <small>{plan.journey}</small>
                  <b>{plan.priceDisplay}</b>
                  <em>
                    <span>{plan.currency}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{plan.eur}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{plan.usdDisplay}</span>
                  </em>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="calculator-fieldset calculator-classes-step">
          <legend><span>02</span> Añade clases extra</legend>
          <p className="calculator-step-copy">Elige cuántas sesiones quieres sumar este mes.</p>
          <div className="calculator-quantity-list">
            {sessionServices.map((service) => {
              const quantity = serviceQuantities[service.id] ?? 0
              return (
                <label key={service.id} htmlFor={`quantity-${service.id}`} className={quantity > 0 ? 'is-selected' : ''}>
                  <span>
                    <strong>{service.label}</strong>
                    <small>{service.description}</small>
                    <b>{formatCop(service.priceCop)} COP / sesión</b>
                  </span>
                  <span className="calculator-select-wrap">
                    <small>CANTIDAD</small>
                    <select
                      id={`quantity-${service.id}`}
                      value={quantity}
                      onChange={(event) => updateQuantity(service.id, event.target.value)}
                    >
                      {service.quantities.map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="calculator-fieldset calculator-extras-step">
          <legend><span>03</span> Completa tu arsenal</legend>
          <p className="calculator-step-copy">Añade las herramientas que tu transformación necesita.</p>
          <div className="calculator-extra-groups">
            {EXTRA_GROUPS.map((group) => (
              <section key={group.category} className="calculator-extra-group">
                <div className="calculator-extra-group-heading">
                  <h3>{group.title}</h3>
                  <p>{group.promise}</p>
                </div>
                <div className="calculator-extra-list">
                  {group.services.map((service) => {
                    const selected = extraIds.includes(service.id)
                    return (
                      <label key={service.id} className={selected ? 'is-selected' : ''}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleExtra(service.id)}
                        />
                        <span>
                          <strong>{service.label}</strong>
                          <small>{service.description}</small>
                        </span>
                        <b>{service.priceDisplay}</b>
                      </label>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="calculator-summary" aria-live="polite">
        <div className="calculator-summary-heading">
          <p>MI TRANSFORMACIÓN</p>
          <span>{calculation.plan.name} · {calculation.plan.journey}</span>
        </div>
        <div className="calculator-emotional-feedback" role="status" aria-live="polite">
          <strong>{conversionMessage.calculatorMessage}</strong>
          {hasAddedServices && <span>Buen añadido. Esto va a acelerar tu transformación.</span>}
        </div>
        <dl className="calculator-summary-breakdown">
          <div><dt>Plan base</dt><dd>{calculation.plan.priceDisplay}</dd></div>
          <div><dt>Servicios añadidos</dt><dd>{formatCop(servicesTotal)}</dd></div>
        </dl>
        <p className="calculator-transformation-total">
          <span>Tu transformación:</span>
          <strong>{calculation.totalDisplay} COP/mes</strong>
        </p>
        <span className="calculator-summary-eur">
          <span>{calculation.eurApprox}</span>
          <span aria-hidden="true"> · </span>
          <span>{calculation.usdApprox}</span>
        </span>
        <p className="calculator-decision-line">Tu transformación empieza cuando decides.</p>

        <div className="calculator-summary-selection">
          <h3>LO QUE AÑADISTE</h3>
          {selectedItems.length > 0 ? (
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}><span>{item.label}</span><strong>{formatCop(item.subtotalCop)}</strong></li>
              ))}
            </ul>
          ) : <p>Tu plan base está listo. Añade servicios solo si los necesitas.</p>}
        </div>

        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="calculator-whatsapp">
          <MessageCircle size={18} /> DAR EL PRIMER PASO
        </a>
        <small className="calculator-summary-note">Tu selección completa se incluirá automáticamente en WhatsApp.</small>
      </aside>
    </div>
  )
}
