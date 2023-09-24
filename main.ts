import * as multisig from "@sqds/multisig";
import { Connnection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const { Permission, Permissions } = multisig.types;
const connection = new Connection("http://localhost:8899", "confirmed");
