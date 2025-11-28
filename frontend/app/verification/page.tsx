import LockedStatusPage from "../../components/shared-theme/LockedStatusPage";

export default function Verification() {
  return (
    <LockedStatusPage
      title="Verification in Progress"
      message="Your account is under verification. We will email you once it is approved."
      color="primary"
    />
  );
}
