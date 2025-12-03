"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LMSIcon } from "../../sign-in-side/components/CustomIcons"; // your logo

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="#">
        virtualeducationhub
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      {/* Main footer sections */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* LMS Logo + Newsletter */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <LMSIcon /> {/* Replace with LMS logo */}
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Join the newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Subscribe for LMS updates, course announcements, and tips.
            </Typography>
            <InputLabel htmlFor="email-newsletter">Email</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Your email address"
                sx={{ width: '250px' }}
              />
              <Button variant="contained" color="primary" size="small">
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Product Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Courses
          </Typography>
          <Link color="text.secondary" variant="body2" href="#features">
            Features
          </Link>
          <Link color="text.secondary" variant="body2" href="#pricing">
            Pricing
          </Link>
          <Link color="text.secondary" variant="body2" href="#faq">
            FAQs
          </Link>
          <Link color="text.secondary" variant="body2" href="#highlights">
            Highlights
          </Link>
          <Link color="text.secondary" variant="body2" href="#testimonials">
            Testimonials
          </Link>
        </Box>

        {/* Company Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Company
          </Typography>
          <Link color="text.secondary" variant="body2" href="#about">
            About Us
          </Link>
          <Link color="text.secondary" variant="body2" href="#careers">
            Careers
          </Link>
          <Link color="text.secondary" variant="body2" href="#contact">
            Contact
          </Link>
        </Box>

        {/* Support / Legal */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Support
          </Typography>
          <Link color="text.secondary" variant="body2" href="#terms">
            Terms
          </Link>
          <Link color="text.secondary" variant="body2" href="#privacy">
            Privacy
          </Link>
          <Link color="text.secondary" variant="body2" href="#help">
            Help Center
          </Link>
        </Box>
      </Box>

      {/* Bottom row: copyright + social */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#privacy">
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            •
          </Typography>
          <Link color="text.secondary" variant="body2" href="#terms">
            Terms of Service
          </Link>
          <Copyright />
        </div>

        <Stack direction="row" spacing={1} useFlexGap sx={{ color: 'text.secondary' }}>
          <IconButton color="inherit" size="small" href="https://github.com/mylms" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" size="small" href="https://twitter.com/mylms" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" size="small" href="https://linkedin.com/company/mylms" aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
