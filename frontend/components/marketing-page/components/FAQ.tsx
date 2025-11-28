import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Box sx={{ width: '100%' }}>
        {/* FAQ 1 */}
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" variant="subtitle2">
              How do I enroll in a course?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              To enroll in a course, browse the course catalog, select your desired course,
              and click on the “Enroll” button. Payment options are available for paid courses.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ 2 */}
        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" variant="subtitle2">
              Can I access recorded lessons after the live class?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Yes! All live sessions are recorded and made available in your dashboard,
              so you can review them anytime for better understanding.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ 3 */}
        <Accordion
          expanded={expanded.includes('panel3')}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span" variant="subtitle2">
              How do I submit assignments and quizzes?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Assignments and quizzes can be submitted directly through the LMS. Each
              course has a dedicated section for submitting tasks, and deadlines are
              clearly displayed in your dashboard.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ 4 */}
        <Accordion
          expanded={expanded.includes('panel4')}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography component="span" variant="subtitle2">
              How can I track my learning progress?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              The LMS provides a personalized dashboard showing your completed lessons,
              quiz scores, and overall progress. You can monitor your learning and
              stay on track with upcoming tasks and deadlines.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ 5 */}
        <Accordion
          expanded={expanded.includes('panel5')}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography component="span" variant="subtitle2">
              Who can I contact for technical support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              For any technical issues, contact our support team via&nbsp;
              <Link href="mailto:support@lms.com">support@lms.com</Link>.
              We are available to help you quickly resolve any problems with your account or courses.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
