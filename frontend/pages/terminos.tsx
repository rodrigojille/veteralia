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
            1. **Aceptación de los Términos:** Al acceder y utilizar Vetoralia, aceptas estos términos y condiciones en su totalidad.
2. **Uso de la Plataforma:** Solo puedes usar Vetoralia para fines legales relacionados con la búsqueda y gestión de servicios veterinarios.
3. **Registro de Usuario:** Debes proporcionar información verídica y mantener la confidencialidad de tu cuenta.
4. **Privacidad:** Nos comprometemos a proteger tu información personal. Consulta nuestra Política de Privacidad para más detalles.
5. **Responsabilidad:** Vetoralia no se hace responsable por acuerdos o servicios realizados entre usuarios y veterinarios.
6. **Modificaciones:** Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes.

Para cualquier duda, contáctanos en soporte@vetoralia.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
