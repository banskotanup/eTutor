import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Interactive Online Classes',
    description:
      'Engage in live, interactive tuition with features like screen sharing, whiteboards, and polls.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Personalized Dashboard',
    description:
      'Students can track upcoming classes, assignments, quizzes, and view their learning progress at a glance.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Assignments & Quizzes',
    description:
      'Teachers can create and manage assignments and quizzes with automated grading and detailed reports.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Performance Tracking',
    description:
      'Monitor student progress with analytics, reports, and insights to enhance learning outcomes.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable Support',
    description:
      'Get assistance for any issues with responsive support for both students and educators.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Accessible Anywhere',
    description:
      'Our platform works across devices, ensuring seamless learning from desktops, tablets, and mobiles.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover the core features of Virtual Education Hub: interactive online classes, 
            assignments & quizzes, personalized dashboards, progress tracking, support, and multi-device accessibility.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
