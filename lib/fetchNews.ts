import {gql} from 'graphql-request'
import sortNewsByImage from './sortNewsByImage';
const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    //GraphQL query

    const query = gql`
  query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
  )   {
    myQuery(
                access_key: $access_key
                categories: $categories
                countries: "us"
                sort: "published_desc"
                keywords: $keywords
    ) {
      data {
        author
        category
        country
        description
        image
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
`;

    // fetch function with nextjs caching
        const res = await fetch('https://reutlingen.stepzen.net/api/calico-zebu/__graphql', {
            method: "POST",
            cache: isDynamic ? 'no-cache' : 'default',
            next: isDynamic ? { revalidate: 0} : { revalidate: 20},
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
            },
            body: JSON.stringify({
                query,
                variables: {
                    access_key: process.env.MEDIASTACK_API_KEY,
                    categories: category,
                    keywords: keywords
                }
            })
        })

        console.log(
            'loading new data from api for category',
            category,
            keywords
        )

        const newsResponse = await res.json()
    // sort fucntion by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery)

    return news;
};

export default fetchNews;

// stepzen import curl http://api.mediastack.com/v1/news?access_key=b1fece5ecbeb77c571190362444506aa&sources=business,sports