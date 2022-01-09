use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, PasswordVerifier, SaltString},
    Argon2, PasswordHash,
};
use hex::ToHex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DerivKey {
    raw: String,
    hash: String,
    salt: String,
}

#[wasm_bindgen]
impl DerivKey {
    pub fn new(raw: String, hash: String, salt: String) -> Self {
        Self { raw, hash, salt }
    }

    pub fn get_raw(&mut self) -> String {
        self.raw.clone()
    }

    pub fn get_hash(&mut self) -> String {
        self.hash.clone()
    }

    pub fn get_salt(&mut self) -> String {
        self.salt.clone()
    }

    pub fn derive_key(input: &str) -> Self {
        let salt = DerivKey::generate_salt();

        DerivKey::derive_key_with_salt(input, salt.as_ref())
    }

    pub fn generate_salt() -> String {
        SaltString::generate(&mut OsRng).as_str().to_owned()
    }

    pub fn derive_key_with_salt(input: &str, salt: &str) -> Self {
        let argon2 = Argon2::default();

        let raw_hash = argon2
            .hash_password(input.as_bytes(), &salt)
            .expect("Invalid input key");

        let hash = raw_hash.hash.expect("Hash is not in!").encode_hex_upper();

        let salt = raw_hash
            .salt
            .expect("Couldn't get salt, only pepper")
            .to_string();

        Self::new(raw_hash.to_string(), hash, salt)
    }

    pub fn verify_key(password: &str, password_hash: &str) -> bool {
        match PasswordHash::new(&password_hash) {
            Ok(hash) => Argon2::default()
                .verify_password(password.as_bytes(), &hash)
                .is_ok(),
            Err(e) => {
                println!("Failed while parsing hash!: {}", e);
                false
            }
        }
    }
}
