use sha2::{Digest, Sha256};

use hex::ToHex;

pub fn sha256(input: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(&input.as_bytes());
    hasher.finalize().encode_hex_upper()
}

fn main() {
    println!("Hello, world!");
    let password = "secretP44sw0rd";
    println!("ASDASD");
    let hashed = sha256(&password);
    println!("{:?}", hashed);
}
