import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const NftsPages = () => {
  const [nfts, setNfts] = useState([]);
  const baseURI =
    "https://black-capitalist-swan-487.mypinata.cloud/ipfs/QmXgCjHNjVadHdFsWo6yGcdixF2aUsHuUubVLBqFMVVdfE/";

  // IDs de los NFTs a cargar
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]; // Puedes cambiar los IDs según sea necesario

  // Cargar datos de los NFTs
  useEffect(() => {
    const fetchNFTs = async () => {
      const nftData = [];
      for (const id of tokenIds) {
        const response = await fetch(`${baseURI}${id}.json`);
        const data = await response.json();
        nftData.push(data);
      }
      setNfts(nftData);
    };

    fetchNFTs();
  }, []);

  // Función de compra
  const handleBuyNFT = (tokenId) => {
    console.log(`Comprar NFT con Token ID: ${tokenId}`);
    // Aquí puedes agregar lógica para interactuar con el contrato inteligente.
  };

  return (
    <Container className="mt-5 profile-page">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "250px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={nft.image}
                alt={nft.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h3 style={{ fontSize: "1.2rem", margin: "10px 0" }}>{nft.name}</h3>
              <p style={{ color: "#555" }}>{nft.description}</p>
              <Button
                variant="primary"
                onClick={() => handleBuyNFT(tokenIds[index])}
                style={{ marginTop: "10px" }}
              >
                Comprar
              </Button>
            </div>
          ))
        ) : (
          <p>Cargando NFTs...</p>
        )}
      </div>
    </Container>
  );
};

export default NftsPages;
