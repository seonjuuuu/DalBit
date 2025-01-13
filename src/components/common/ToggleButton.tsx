import { useState } from "react";
import Switch from "react-switch";
import styles from "./ToggleButton.module.scss";

type ToggleButtonProps = {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
};

const ToggleButton = ({ checked, onChange }: ToggleButtonProps) => {
  return (
    <div>
      <Switch
        checked={checked}
        onChange={onChange}
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
