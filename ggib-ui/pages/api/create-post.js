// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createPostFetch } from '../../hooks'

export default async function handler(req, res) {
  const body = req.body
  try {
    await createPostFetch(body)
    res.redirect(301, '/posts');
  } catch(error) {
    throw new Error(error);    
  }
}