import { Sandpack } from "@codesandbox/sandpack-react";

const SandpackEnv = ({ files }) => {
    return (
        <Sandpack theme="light" options={{ showConsole: true }} files={files} />
    );
};

export default SandpackEnv;
