"use client"; // needed for useRouter

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { LMSIcon } from './CustomIcons';
import { useRouter } from 'next/navigation';

const lmsItems = [
  {
    icon: <SchoolRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Course Management',
    description:
      'Easily create, update, and organize courses for your students with full control over content and scheduling.',
  },
  {
    icon: <QuizRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Quizzes & Assessments',
    description:
      'Build interactive quizzes and assessments to track student progress and understanding effectively.',
  },
  {
    icon: <AssignmentTurnedInRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Assignments & Submissions',
    description:
      'Manage assignments efficiently, set deadlines, and collect submissions seamlessly online.',
  },
  {
    icon: <GroupRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Student Collaboration',
    description:
      'Enable discussions, group projects, and peer interactions to enhance the learning experience.',
  },
];

export default function LMSContent() {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <LMSIcon />
      </Box>
      {lmsItems.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}

      {/* Button at buttom */}
      <Button
        onClick={goToHome}
        sx={{
          alignSelf: 'center',
          mb: 2,
          px: 5,
          py: 1.8,
          borderRadius: 10,
          fontWeight: 'bold',
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #00D3AB, #4876EE)',
          color: 'white',
          boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
            background: 'linear-gradient(135deg, #4876EE, #00D3AB)',
          },
        }}
      >
        Back to Home Page
      </Button>
    </Stack>
  );
}
