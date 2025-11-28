import LockedStatusPage from "../../components/shared-theme/LockedStatusPage";

export default function Rejected() {
  return (
    <LockedStatusPage
      title="Registration Rejected"
      message="Your registration has been rejected. Please contact support if you believe this is an error."
      color="error"
    />
  );
}
