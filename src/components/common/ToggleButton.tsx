import { useState } from "react";
import Switch from "react-switch";
import styles from "./ToggleButton.module.scss";

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (nextChecked: boolean) => {
    setIsChecked(nextChecked);
  };

  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={handleToggle}
        onColor="#f7be1d"
        onHandleColor="#8a6600"
        handleDiameter={20}
        uncheckedIcon={<div className={styles.toggleBtn}>N</div>}
        checkedIcon={<div className={styles.toggleBtn}>Y</div>}
      />
    </div>
  );
};

export default ToggleButton;
