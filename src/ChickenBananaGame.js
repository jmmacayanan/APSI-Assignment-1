import React from"react";
import { useState } from "react";

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
];

function ChickenBananaGame() {
    function getRandomImage() {
        const index = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[index];
    }
}