import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';

import Link from 'next/link';

export default function Terminos() {
  return (
    <>
      <Head>
        <title>Términos y Condiciones | Vetoralia</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box textAlign="center" mb={4}>
          <Link href="/" passHref>
            <img src="/logo.png" alt="Vetoralia Logo" style={{ width: 80, marginBottom: 12, cursor: 'pointer' }} />
          </Link>
        </Box>
        <Typography variant="h3" component="h1" fontWeight={700} mb={4} color="primary">
          Términos y Condiciones
        </Typography>
        <Box sx={{ bgcolor: '#f8fafc', p: 4, borderRadius: 3, boxShadow: 1 }}>
          <Typography variant="body1" mb={2}>
            Bienvenido a Vetoralia. Al utilizar nuestra plataforma, aceptas los siguientes términos y condiciones. Por favor, lee cuidadosamente este documento antes de utilizar nuestros servicios.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. **Aceptación de los Términos:** Al acceder y utilizar Vetoralia, aceptas estos términos y condiciones conforme a la Ley Federal de Protección al Consumidor (LFPC).
2. **Uso de la Plataforma:** El usuario se compromete a utilizar Vetoralia únicamente para fines legales relacionados con la búsqueda y gestión de servicios veterinarios. Queda prohibido el uso indebido o fraudulento.
3. **Registro y Obligaciones del Usuario:** El usuario debe proporcionar información verídica y mantener la confidencialidad de su cuenta. Es responsable de todas las actividades realizadas desde su cuenta.
4. **Privacidad y Datos Personales:** Vetoralia protege tus datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Consulta la Política de Privacidad para más información sobre el tratamiento de tus datos y el ejercicio de tus derechos ARCO.
5. **Responsabilidad:** Vetoralia funge como intermediario entre usuarios y veterinarios, por lo que no es responsable de la calidad, cumplimiento o ejecución de los servicios pactados entre ambas partes.
6. **Modificaciones:** Vetoralia podrá modificar estos términos y condiciones en cualquier momento. Los cambios serán notificados a través de la plataforma.
7. **Jurisdicción y Ley Aplicable:** Para la interpretación y cumplimiento de estos términos, las partes se someten a las leyes y tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.
8. **Resolución de Controversias:** Cualquier controversia derivada del uso de la plataforma será resuelta de conformidad con la legislación mexicana vigente.

Para ejercer tus derechos o resolver dudas, contáctanos en soporte@vetoralia.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
