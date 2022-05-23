/** @jsxImportSource @emotion/react */
import Image from 'next/image'
import { IndexArticleItem } from "../styles/index.emotion";

export const displayArticleTitles = (allArticles) => {
  if (allArticles == null) {
    return [];
  }

  return allArticles.map((articleObj) => {
    if(articleObj && articleObj?.node){
      const { title, slug, coverImageWithText } = articleObj.node;
      return (  
        <li key={slug} css={IndexArticleItem}>
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET}${coverImageWithText?.file}`}
            width={300}
            height={150}
            objectFit="cover"
            alt={`${title}-img`}
          />
          <a href={slug}>
            {title}
          </a>
        </li>
      ); 
    }
  });
};

