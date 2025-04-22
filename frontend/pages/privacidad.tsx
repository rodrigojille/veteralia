import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';

import Link from 'next/link';

export default function Privacidad() {
  return (
    <>
      <Head>
        <title>Política de Privacidad | Vetoralia</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box textAlign="center" mb={4}>
          <Link href="/" passHref>
            <img src="/logo.png" alt="Vetoralia Logo" style={{ width: 80, marginBottom: 12, cursor: 'pointer' }} />
          </Link>
        </Box>
        <Typography variant="h3" component="h1" fontWeight={700} mb={4} color="primary">
          Política de Privacidad
        </Typography>
        <Box sx={{ bgcolor: '#f8fafc', p: 4, borderRadius: 3, boxShadow: 1 }}>
          <Typography variant="body1" mb={2}>
            Tu privacidad es importante para Vetoralia. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. **Responsable del Tratamiento de Datos:** Vetoralia S.A. de C.V., con domicilio en Ciudad de México, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
2. **Datos Recabados:** Recabamos datos como nombre, correo electrónico, información de mascotas y datos de contacto para brindarte nuestros servicios.
3. **Finalidades:** Tus datos serán utilizados para gestionar cuentas, reservas, contacto y mejorar la experiencia en Vetoralia. No se utilizarán para fines distintos sin tu consentimiento.
4. **Transferencia de Datos:** No transferimos tus datos personales a terceros sin tu consentimiento, salvo obligación legal.
5. **Derechos ARCO:** Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) enviando un correo a privacidad@vetoralia.com. Atenderemos tu solicitud en los plazos establecidos por la ley.
6. **Consentimiento:** Al utilizar la plataforma y proporcionar tus datos, otorgas tu consentimiento para su tratamiento conforme a esta política.
7. **Cookies:** Usamos cookies para mejorar la funcionalidad del sitio. Puedes deshabilitarlas desde la configuración de tu navegador.
8. **Cambios a la Política:** Nos reservamos el derecho de modificar esta política. Los cambios serán notificados en la plataforma.
9. **Jurisdicción:** Cualquier controversia será resuelta conforme a la LFPDPPP y las leyes mexicanas aplicables.

Para dudas o solicitudes, contáctanos en privacidad@vetoralia.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
