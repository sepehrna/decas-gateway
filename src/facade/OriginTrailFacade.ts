import DkgConfig from "../entity/configuration/DkgConfig.js";
import DkgOperationResponse from "../entity/dkg/DkgOperationResponse.js";
import {DkgContentType} from "../enum/DkgContentType.js";

const modulePath = 'dkg.js';
import(modulePath)
    .then((commonjsModule) => {
        // Use your CommonJS module here
        const moduleExport = commonjsModule.default; // or commonjsModule.someNamedExport
        // ... rest of your code
    })
    .catch((error) => {
        console.error('Error importing the CommonJS module:', error);
    });

let DecentralizedKnowledgeGraph;

let dkg: any;

async function initOriginTrailNode(dkgConfig: DkgConfig): Promise<void> {
    if (!dkg) {
        const DecentralizedKnowledgeGraphModule = await import(modulePath);
        DecentralizedKnowledgeGraph = DecentralizedKnowledgeGraphModule.default; // or .DecentralizedKnowledgeGraph if it's a named export
        dkg = new DecentralizedKnowledgeGraph(dkgConfig);
    }
    await checkOriginTrailNode();
}

async function checkOriginTrailNode(): Promise<string | undefined> {
    let nodeInfo: string | undefined;
    try {
        nodeInfo = await dkg.node.info();
        console.log("================== ORIGIN TRAIL NODE INFO RECEIVED ===========", '\n');
        console.log(nodeInfo, '\n');
        console.log("=========================== END ==============================");
        return nodeInfo;
    } catch (e) {
        throw new Error("Could not connect to the OriginTrail node. Reason: " + e);
    }
}

async function findAsset(ual: any, contentType: any): Promise<DkgOperationResponse> {

    if (ual === "") {
        throw new Error("Universal asset locator (UAL) is not valid.")
    }
    try {
        const response = await dkg.asset.get(ual, {
            contentType: contentType ? contentType : DkgContentType.Public
        });
        console.log("========== ORIGIN TRAIL FIND OPERATION INFO RECEIVED ==========", '\n');
        console.log(JSON.stringify(response, null, 2), '\n');
        console.log("=========================== END ==============================");
        return response;
    } catch (e) {
        throw new Error("Could not find asset. Reason: " + e);
    }
}

async function createAsset(publicAssertion: string, privateAssertion: string): Promise<DkgOperationResponse> {
    let response;
    if (publicAssertion === "" && privateAssertion === "") {
        throw new Error("Json data is not valid. ")
    } else {
        try {
            if (publicAssertion && !privateAssertion) {
                response = await dkg.asset.create({
                        public: publicAssertion,
                    },
                    {epochsNum: 2}
                );
            } else if (privateAssertion && !publicAssertion) {
                response = await dkg.asset.create({
                        private: privateAssertion,
                    },
                    {epochsNum: 2}
                );
            } else {
                response = await dkg.asset.create({
                        public: publicAssertion,
                        private: privateAssertion
                    },
                    {epochsNum: 2}
                );
            }
            console.log("========= ORIGIN TRAIL CREATE OPERATION INFO RECEIVED =========", '\n');
            console.log(JSON.stringify(response, null, 2), '\n');
            console.log("=========================== END ==============================");
            return response;
        } catch (e) {
            throw new Error("Could not create asset. Reason: " + e);
        }
    }
}

async function updateAsset(ual: any, publicAssertion: string, privateAssertion: string): Promise<DkgOperationResponse> {
    if (ual === "") {
        throw new Error("Universal asset locator (UAL) is not valid. ")
    }
    let response;
    if (publicAssertion === "" && privateAssertion === "") {
        throw new Error("Json data is not valid for update operation. ")
    } else {
        try {
            await dkg.asset.increaseAllowance('1569429592284014000');
            if (publicAssertion && !privateAssertion) {
                response = await dkg.asset.update(ual, {
                        public: publicAssertion,
                    },
                    {epochsNum: 2}
                );
            } else {
                response = await dkg.asset.update(ual, {
                        private: privateAssertion,
                    },
                    {epochsNum: 2}
                );
            }
            await dkg.asset.decreaseAllowance('1569429592284014000');
            console.log("========= ORIGIN TRAIL CREATE OPERATION INFO RECEIVED =========", '\n');
            console.log(JSON.stringify(response, null, 2), '\n');
            console.log("=========================== END ==============================");
            return response;
        } catch (e) {
            throw new Error("Could not create asset. Reason: " + e);
        }
    }
}


export {initOriginTrailNode, findAsset, createAsset, updateAsset};