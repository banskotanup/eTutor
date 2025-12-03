import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useColorScheme } from '@mui/material/styles';

const userTestimonials = [
  {
    avatar: <Avatar alt="Anjali Sharma" src="/images/avatar1.jpg" />,
    name: 'Anjali Sharma',
    occupation: 'High School Student',
    testimonial:
      "Virtual Education Hub has completely transformed my learning experience. The live online classes are interactive and easy to follow, and I can track my progress effortlessly. Highly recommend it!",
  },
  {
    avatar: <Avatar alt="Rohit Verma" src="/images/avatar2.jpg" />,
    name: 'Rohit Verma',
    occupation: 'College Student',
    testimonial:
      "The LMS is intuitive and well-organized. I love how I can access recorded lessons, submit assignments online, and stay on top of all my subjects without stress.",
  },
  {
    avatar: <Avatar alt="Priya Singh" src="/images/avatar3.jpg" />,
    name: 'Priya Singh',
    occupation: 'Parent',
    testimonial:
      "As a parent, I can monitor my child's progress and see their performance reports easily. The platform is secure, reliable, and truly supportive of online learning.",
  },
  {
    avatar: <Avatar alt="Siddharth Joshi" src="/images/avatar4.jpg" />,
    name: 'Siddharth Joshi',
    occupation: 'Tutor',
    testimonial:
      "Teaching through Virtual Education Hub has been smooth and engaging. The interactive tools make lessons more effective and students enjoy learning online.",
  },
  {
    avatar: <Avatar alt="Neha Kapoor" src="/images/avatar5.jpg" />,
    name: 'Neha Kapoor',
    occupation: 'Student',
    testimonial:
      "I appreciate the live quizzes and assignments. The instant feedback helps me understand my mistakes and improve faster. Online tuition has never been easier!",
  },
  {
    avatar: <Avatar alt="Vikram Rao" src="/images/avatar6.jpg" />,
    name: 'Vikram Rao',
    occupation: 'Tutor',
    testimonial:
      "Virtual Education Hub makes it easy to manage multiple classes, track student progress, and provide personalized attention online. It's a great tool for modern education.",
  },
];

const darkModeLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const lightModeLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme();

  let logos;
  if (mode === 'system') {
    if (systemMode === 'light') {
      logos = lightModeLogos;
    } else {
      logos = darkModeLogos;
    }
  } else if (mode === 'light') {
    logos = lightModeLogos;
  } else {
    logos = darkModeLogos;
  }

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          See what our students and tutors love about us.
          Experience interactive online classes, personalized learning, and a
          platform designed to make education accessible, engaging, and effective
          for everyone.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
