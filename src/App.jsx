import { useState } from 'react';
import './index.css';

const packs = [1, 3, 6];
const tallas = ["S", "M", "L", "XL", "XXL", "3XL"];
const colores = [
  "Negro", "Blanco", "Beige", "Rojo", "Azul cielo",
  "Verde oliva", "Mora rosa", "Azul navy", "Crema"
];

export default function App() {
  const [step, setStep] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const [camisas, setCamisas] = useState([{ color: "", talla: "" }]);
  const [datos, setDatos] = useState({ nombre: "", cedula: "", ciudad: "", direccion: "", barrio: "", celular: "" });

  const handlePackSelect = (n) => {
    setCantidad(n);
    setCamisas(Array(n).fill({ color: "", talla: "" }));
    setStep(2);
  };

  const handleCamisaChange = (index, field, value) => {
    const nuevasCamisas = [...camisas];
    nuevasCamisas[index] = { ...nuevasCamisas[index], [field]: value };
    setCamisas(nuevasCamisas);
  };

  const handleDatosChange = (field, value) => {
    setDatos({ ...datos, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Pedido enviado:", { cantidad, camisas, datos });
    setStep(4);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-8">
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Haz tu pedido fácil y rápido</h1>
          <p className="mb-2">Selecciona un pack:</p>
          <div className="flex gap-4">
  {packs.map((n) => (
    <button
      key={n}
      className="border px-4 py-2 rounded-md hover:bg-gray-100 transition font-medium"
      onClick={() => handlePackSelect(n)}
    >
      {n} Camisa{n > 1 && 's'}
    </button>
  ))}
</div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecciona color y talla</h2>
          {camisas.map((c, i) => (
            <div key={i} className="mb-4 p-3 border rounded-md">
              <p className="font-medium">Camisa {i + 1}</p>
              <select className="block w-full mt-1" onChange={(e) => handleCamisaChange(i, 'color', e.target.value)}>
                <option value="">Selecciona color</option>
                {colores.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className="block w-full mt-1" onChange={(e) => handleCamisaChange(i, 'talla', e.target.value)}>
                <option value="">Selecciona talla</option>
                {tallas.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setStep(3)}>Continuar</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Datos personales</h2>
          {Object.keys(datos).map((key) => (
            <input
              key={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1) + (key === 'barrio' ? ' (opcional)' : '')}
              className="block w-full border rounded px-3 py-2 mb-2"
              onChange={(e) => handleDatosChange(key, e.target.value)}
            />
          ))}
          <button onClick={handleSubmit}>Confirmar Pedido</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold">¡Gracias por tu pedido!</h2>
          <p className="mt-2">Nos comunicaremos contigo por correo o WhatsApp para coordinar el envío.</p>
        </div>
      )}
    </div>
  );
}
