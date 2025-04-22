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
            1. **Recopilación de información:** Solo recolectamos los datos necesarios para brindarte nuestros servicios (nombre, email, información de mascotas, etc.).
2. **Uso de la información:** Utilizamos tus datos para gestionar cuentas, reservas y mejorar la experiencia en Vetoralia.
3. **Protección de datos:** Implementamos medidas de seguridad para proteger tu información personal.
4. **Compartir datos:** No vendemos ni compartimos tus datos con terceros sin tu consentimiento, salvo requerimiento legal.
5. **Cookies:** Usamos cookies para mejorar la funcionalidad del sitio. Puedes gestionarlas desde tu navegador.
6. **Tus derechos:** Puedes acceder, corregir o eliminar tus datos personales contactándonos en privacidad@vetoralia.com.

Si tienes preguntas sobre esta política, escríbenos a privacidad@vetoralia.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
