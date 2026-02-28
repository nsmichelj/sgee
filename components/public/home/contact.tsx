import { Container } from "@/components/container";
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
  },
  {
    label: "Email",
    content: "pedroluiscedenio@gmail.com",
    icon: Mail,
  },
  {
    label: "Dirección",
    content: "+58 000-000-0000",
    icon: MapPin,
  },
];

export const ContactItem = ({
  label,
  content,
  icon: Icon,
}: {
  label: string;
  content: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex gap-2">
      <div className="">
        <Icon className="size-10 text-primary bg-primary/10 p-2 rounded-md" />
      </div>
      <div className="">
        <p className="font-bold">{label}</p>
        <p className="text-sm font-semibold text-muted-foreground">{content}</p>
      </div>
    </div>
  );
};

export function Contact() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTag>Contacto</SectionTag>
          <SectionTitle>Estamos para ayudarte</SectionTitle>
          <SectionDescription>
            Comunícate con nosotros para resolver tus dudas o recibir
            información sobre matrículas y actividades.
          </SectionDescription>
        </SectionHeader>

        <div className="flex flex-col gap-8">
          <div className="w-full h-96 overflow-hidden">
            <iframe
              className="w-full h-full!"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d706.5484306977462!2d-63.91735058777596!3d10.249679307740893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c325fac01a137f7%3A0xe1b92cba82e90135!2sEscuela%20B%C3%A1sica%20Pedro%20Luis%20Cede%C3%B1o!5e1!3m2!1ses!2sve!4v1772117071207!5m2!1ses!2sve"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex justify-center flex-wrap gap-8">
            {contactInfo.map((contact) => (
              <ContactItem
                key={contact.label}
                label={contact.label}
                content={contact.content}
                icon={contact.icon}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
