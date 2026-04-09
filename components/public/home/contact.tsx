import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "../section";

const contactInfo = [
  {
    label: "Teléfono",
    content: "+58 000-000-0000",
    icon: Phone,
    description: "Atención de Lunes a Viernes",
  },
  {
    label: "Email",
    content: "pedroluiscedenio@gmail.com",
    icon: Mail,
    description: "Consultas generales",
  },
  {
    label: "Dirección",
    content: "Av. Principal, Edif. Pedro Luis Cedeño",
    icon: MapPin,
    description: "Visítanos en nuestras instalaciones",
  },
];

export const ContactItem = ({
  label,
  content,
  description,
  icon: Icon,
}: {
  label: string;
  content: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card>
      <CardContent className="flex items-start gap-4">
        <div>
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon className="size-6 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-sm font-bold text-foreground mb-1 leading-none">
            {content}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export function Contact() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader>
          <SectionTag>Contacto</SectionTag>
          <SectionTitle>Estamos Conectados Contigo</SectionTitle>
          <SectionDescription>
            Si tienes dudas, sugerencias o necesitas información adicional, no
            dudes en contactarnos.
          </SectionDescription>
        </SectionHeader>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((contact) => (
            <ContactItem
              key={contact.label}
              label={contact.label}
              content={contact.content}
              description={contact.description}
              icon={contact.icon}
            />
          ))}
        </div>

        <div className="w-full h-110 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d706.5484306977462!2d-63.91735058777596!3d10.249679307740893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c325fac01a137f7%3A0xe1b92cba82e90135!2sEscuela%20B%C3%A1sica%20Pedro%20Luis%20Cede%C3%B1o!5e1!3m2!1ses!2sve!4v1772117071207!5m2!1ses!2sve"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </Section>
  );
}
