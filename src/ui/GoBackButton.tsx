import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../icons";

type GoBackButtonProps = {
  goBackSteps?: number; // Optional prop to specify how many steps to go back in history
  redirectPath?: string; // Optional prop to specify a direct path to navigate to
};

const GoBackButton: React.FC<GoBackButtonProps> = ({
  goBackSteps = 1,
  redirectPath,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (redirectPath) {
      navigate(redirectPath); // Navigate to the provided path
    } else {
      navigate(-goBackSteps); // Navigate back by a specified number of steps
    }
  };

  return (
    <button
      className="flex items-center gap-2 px-2 font-medium border rounded-md text-crispWhite border-crispWhite max-w-max hover:text-slateBlue hover:bg-white"
      onClick={handleNavigation}
    >
      <ArrowLeftIcon />
      Back
    </button>
  );
};

export default GoBackButton;
