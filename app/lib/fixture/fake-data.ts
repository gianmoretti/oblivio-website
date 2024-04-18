import { Asset, CategoryType, Designated } from "../model/product";

export const firstDesignated: Designated = {
    id: "1",
    email: "example1@example.com",
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-05-15",
    birthPlace: "New York",
    residence: "Los Angeles",
    phoneNumber: "123-456-7890",
    fiscalCode: "ABCDEF12G34H567I",
    color: "#3366CC",
    imageUrl: "https://example.com/image1.jpg",
    updatedAt: "2024-03-12T08:00:00Z"
};

export const secondDesignated: Designated = {
    id: "2",
    email: "example2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    birthDate: "1985-10-20",
    birthPlace: "Chicago",
    residence: "Miami",
    phoneNumber: "987-654-3210",
    fiscalCode: "WXYZAB12C34D567E",
    color: "#FF9900",
    imageUrl: "https://example.com/image2.jpg",
    updatedAt: "2024-03-12T09:00:00Z"
}

export const thirdDesignated: Designated = {
    id: "3",
    email: "example3@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    birthDate: "1995-12-25",
    birthPlace: "Houston",
    residence: "Dallas",
    phoneNumber: "456-789-0123",
    fiscalCode: "LMNOPQ56R78S901T",
    color: "#663399",
    imageUrl: "https://example.com/image3.jpg",
    updatedAt: "2024-03-12"
}

export const firstAsset: Asset = {
    id: '1',
    name: 'My Asset 1',
    category: CategoryType.CRYPTO,
    designatedList: [firstDesignated, secondDesignated],
    description: 'Lorem ipsum dolor sit amet',
    documents: [
        // Elenca gli oggetti AssetDocument qui
    ],
    updatedAt: '2024-03-12'
}

export const secondAsset: Asset = {
    id: '2',
    name: 'My Asset 2',
    category: CategoryType.FINANCIAL,
    designatedList: [firstDesignated, thirdDesignated],
    description: 'Lorem ipsum dolor sit amet',
    documents: [
        // Elenca gli oggetti AssetDocument qui
    ],
    updatedAt: '2024-03-12'
}

export const thirdAsset: Asset = {
    id: '3',
    name: 'My Asset 3',
    category: CategoryType.INSURANCE,
    designatedList: [firstDesignated, secondDesignated],
    description: 'Lorem ipsum dolor sit amet',
    documents: [
        // Elenca gli oggetti AssetDocument qui
    ],
    updatedAt: '2024-03-12'
}


export const allDesignatedUsers = [firstDesignated, secondDesignated, thirdDesignated]
export const allAssets = [firstAsset, secondAsset, thirdAsset]
