import { Sandpack } from "@codesandbox/sandpack-react";
import Styles from "./styles.module.css";

const SandpackEnv = ({ files }) => {
    return (
        <div className={Styles.sandpackContainer}>
            <Sandpack
                theme="light"
                options={{ showConsole: true }}
                files={files}
            />
        </div>
    );
};

export default SandpackEnv;
