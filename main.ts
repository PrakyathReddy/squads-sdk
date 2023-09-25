import * as multisig from "@sqds/multisig";
import { Connnection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const { Permission, Permissions } = multisig.types;
const connection = new Connection("http://localhost:8899", "confirmed");

describe("interacting with the Squads v4 sdk", {} => {
  const creater = Keypair.generate();
  const secondMember = Keypair.generate();
    before(async () => {
      const airdropSignature = await connection.requestAirdrop(
        creator.publicKey,
        1 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
    });

    const createKey = Keypair.generate().publicKey;

  // create the multisig account PDA
  const [multisigPda] = multisig.getMultisigPda({createKey});

  it("create a new multisig". async() => {
    // create the mutisig
    const signature = await multisig.rpc.multisigCreate({
      connection,
      // one-time random key
      createKey,
      // the creator and fee payer
      creator,
      multisigPda,
      configAuthority: null,
      timelock: 0,
      members: [{
        key: creator.publicKey,
        permission: Permission.all(),
      },
      {
        key: secondMember.publicKey,
        // this permisssion means that the user will only be able to vote on the transactions
        permisssions: Permissions.fromPermissions([Permission.Vote]),
      },
      ],
      // this means there need needs to be 2 votes for a transaction proposal to be approved
      threshold: 2,
    });
    console.log("Multisig created: ", signature);
  });
});

describe("Interating with the Squads V4 SDk", () => {
  const creator = Keypair.generate();
  const secondMember = Keypair.generate();
  before(sync ()=> {
    const airdropSignature = await connection.requestAirdrop(
      creator.publicKey,
      1 * LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropSignature);
  });
  const createKey = Keypair.generate().publicKey;

  // Derive the multisig account PDA
  const [multisigPda] = multisig.getMultisigPda({createKey});

  it("create a new multisig", async () => {
    // create the multisig
    const signature = await multisig.rpc.multisigCreate({
      connection,
      // one-time random key
      createKey,
      creator,
      multisigPda,
      configAuthority: null,
      timelock: 0,
      members: [{
        key: creator.publicKey,
        permission: Permission.all(),
        },
        {
          key: secondMember.publicKey,
          // this permission means that the user will only be able to vote on the transactions
          permission: Permissions.fromPermissions([Permission.Vote]),
        },
      ],
      // this means there must be 2 votes for the transaction proposal to be approved
      threshold: 2,
    });
    console.log("Multisig created: ", signature);
  });
});
