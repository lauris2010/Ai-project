import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import {increaseApiLimit, checkApiLimit} from "@/lib/ApiLimit"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


export async function POST(
  req: Request
) {
  try{
    const { userId } = auth()
    const body = await req.json()
    const {prompt, amount = 1, resolution = '512x512'} = body

    if (!userId) { 
      return new NextResponse("Unauthorized", {status: 401})
    }

    if(!openai.apiKey) {
      return new NextResponse("OpenAi Key not configured")
    }

    if (!prompt) {
      return new NextResponse("prompt are required", {status: 400})
    }
    
    if (!amount) {
      return new NextResponse("amount are required", {status: 400})
    }

    if (!resolution) {
      return new NextResponse("resolution are required", {status: 400})
    }
    const freeTrial = await checkApiLimit()

    if(!freeTrial){
      return new NextResponse('free trial has expired', {status: 403})
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    await increaseApiLimit()
    return NextResponse.json(response.data)
  } catch(error) {
    console.log('image err', error)
    return new NextResponse ("Internal error", {status: 500})
  }
}