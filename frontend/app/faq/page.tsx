"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppAppBar from "../../components/marketing-page/components/AppAppBar";
import Footer from "../../components/marketing-page/components/Footer";
import AppTheme from "../../components/shared-theme/AppTheme";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is eTutor and what subjects do you offer?",
      answer:
        "eTutor is an online learning platform offering tuition for various subjects including Math, Science, Computer Science, English, and more, for students of all levels.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "You can enroll by signing up on our website, selecting the course you want, and completing the payment process. Once enrolled, you will have access to course materials and live sessions.",
    },
    {
      question: "Do you provide one-on-one tutoring?",
      answer:
        "Yes! eTutor offers both group classes and personalized one-on-one sessions with our experienced tutors.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We provide a full refund if you cancel within the first 7 days of enrollment. After that, refunds are processed on a case-by-case basis.",
    },
    {
      question: "How can I contact support if I have an issue?",
      answer:
        "You can reach our support team via the Contact Us page or by emailing support@etutor.com. We respond within 24 hours.",
    },
  ]);

  return (
    <AppTheme>
      <Box>
        <AppAppBar />

        {/* FAQ Header */}
        <Box
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 10 },
            backgroundColor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "text.primary",
                mb: 2,
              }}
            >
              Frequently Asked Questions
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Have questions about eTutor or our courses? Browse the most common
              queries below. If you don’t find your answer, feel free to contact
              us directly.
            </Typography>
          </Container>
        </Box>

        {/* FAQ List */}
        <Box
          sx={{
            py: { xs: 8, sm: 12 },
            backgroundColor: "background.default",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md">
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        <Footer />
      </Box>
    </AppTheme>
  );
}
