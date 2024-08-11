import { AlchemySigner } from "@alchemy/aa-alchemy";

export const signer = new AlchemySigner({
    client: {
        connection: { apiKey: "alcht_un_FtHJPoBilaUmIHIFb2gie7ISPHhgS" },
        iframeConfig: {
            iframeContainerId: "turnkey-iframe-container",
        },
    },
});
