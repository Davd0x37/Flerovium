use sha2::{Digest, Sha256};

use hex::ToHex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sha256(input: &str) -> String {
  let mut hasher = Sha256::new();
  hasher.update(&input.as_bytes());
  hasher.finalize().encode_hex_upper()
}
