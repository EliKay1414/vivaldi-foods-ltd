import { Bug, Warehouse, Globe, ShieldCheck } from 'lucide-react';

const coreStrengths = [
  { icon: Bug, title: "Pure Honey", desc: "Honey sourced from trusted Volta apiaries." },
  { icon: ShieldCheck, title: "No Adulteration", desc: "No added sugar, syrup, or fake ingredients." },
  { icon: Warehouse, title: "Clean Packing", desc: "Products are packed in clean, controlled spaces." },
  { icon: Globe, title: "Reliable Supply", desc: "Supply support for homes, shops, and partners." },
];

export const Features = () => {
  return (
    <section className="py-12 bg-brand-cream relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreStrengths.map((item, i) => (
            <div key={i} className="p-8 bg-brand-cream border border-brand-brown/10 shadow-sm rounded-xl hover:shadow-md transition-shadow group">
              <item.icon className="w-10 h-10 text-brand-green mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-brand-brown mb-2">{item.title}</h4>
              <p className="text-body-sm text-brand-brown/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
