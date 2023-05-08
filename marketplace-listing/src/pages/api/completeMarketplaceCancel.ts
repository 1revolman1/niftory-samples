import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import { CompleteMarketplaceCancelDocument } from "../../../generated/graphql"
import { getAddressFromCookie } from "../../lib/cookieUtils"

const handler: NextApiHandler = async (req, res) => {
  const backendGQLClient = await getBackendGraphQLClient()

  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to complete marketplace cancel")
  }

  const { id, transactionId } = req.body

  const response = await backendGQLClient.request(CompleteMarketplaceCancelDocument, {
    id,
    transactionId,
  })
  res.status(200).json(response)
}

export default handler
