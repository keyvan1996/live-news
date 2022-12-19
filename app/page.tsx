import { categories } from "../constants"
import fetchNews from "../lib/fetchNews"
import NewsList from "./NewsList"
import response from '../response.json'

async function page() {
    // fetch news data
    const news: NewsResponse = 
    // response ||
     await fetchNews(categories.join(','))

  return (
    <div>
        {/* news list */}
        <NewsList news={news}/>
    </div>
  )
}

export default page