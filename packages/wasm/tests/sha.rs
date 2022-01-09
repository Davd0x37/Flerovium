#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use cryfler::crypto::sha::sha256;

use wasm_bindgen_test::*;
wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_derive_key() {
    use cryfler::crypto::sha::*;

    let password = "secretP44sw0rd";
    let hashed = sha256(&password);

    assert_eq!(
        hashed,
        "E3C39AD05224544D5A12454B4D47D4415F9712D044173D136A9AA51F9846496B"
    );
}
