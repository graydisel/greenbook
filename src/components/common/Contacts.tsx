import { Box, Divider, IconButton, Link, Stack, Tooltip, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

type ContactsProps = {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  instagramHref?: string;
  whatsappHref?: string;
};

export const Contacts = ({
  phone = "+3596640781",
  email = "support@greenbook.example",
  address = "Sofia, Bulgaria",
  hours = "Mon–Sat: 09:00–18:00",
  instagramHref = "#",
  whatsappHref = "#",
}: ContactsProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, minmax(0, 1fr))" },
        gap: { xs: 1.25, sm: 1.5, md: 2 },
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          p: { xs: 1.25, sm: 1.5 },
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CallIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ letterSpacing: 0.3 }}>
              Call us
            </Typography>
          </Stack>
          <Link
            href={`tel:${phone}`}
            underline="none"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "1.05rem", sm: "1.1rem" },
              ":hover": { color: "#e7e7e7" },
              wordBreak: "break-word",
            }}
          >
            {phone}
          </Link>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Fast support for orders and deliveries.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          p: { xs: 1.25, sm: 1.5 },
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ letterSpacing: 0.3 }}>
              Email
            </Typography>
          </Stack>
          <Link
            href={`mailto:${email}`}
            underline="none"
            sx={{
              color: "white",
              fontWeight: 600,
              ":hover": { color: "#e7e7e7" },
              wordBreak: "break-word",
            }}
          >
            {email}
          </Link>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            We usually reply within 24 hours.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          p: { xs: 1.25, sm: 1.5 },
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ letterSpacing: 0.3 }}>
              Location
            </Typography>
          </Stack>
          <Typography sx={{ fontWeight: 600, lineHeight: 1.25 }}>{address}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Pickup available for local orders.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          p: { xs: 1.25, sm: 1.5 },
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ letterSpacing: 0.3 }}>
              Hours
            </Typography>
          </Stack>
          <Typography sx={{ fontWeight: 600, lineHeight: 1.25 }}>{hours}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Sunday: closed
          </Typography>
        </Stack>

        <Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.18)", mb: 0.75 }} />
          <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Follow us
            </Typography>
            <Stack direction="row" spacing={0.25}>
              <Tooltip title="Instagram" arrow>
                <IconButton
                  component="a"
                  href={instagramHref}
                  size="small"
                  aria-label="Instagram"
                  sx={{
                    color: "white",
                    borderRadius: 1.5,
                    ":hover": { backgroundColor: "rgba(255,255,255,0.10)" },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp" arrow>
                <IconButton
                  component="a"
                  href={whatsappHref}
                  size="small"
                  aria-label="WhatsApp"
                  sx={{
                    color: "white",
                    borderRadius: 1.5,
                    ":hover": { backgroundColor: "rgba(255,255,255,0.10)" },
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

