import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import {incrementApiLimit, checkApiLimit} from "@/lib/ApiLimit"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


export async function POST(
  req: Request
) {
  try{
    const { userId } = auth()
    const body = await req.json()
    const {messages} = body

    if (!userId) { 
      return new NextResponse("Unauthorized", {status: 401})
    }

    if(!openai.apiKey) {
      return new NextResponse("OpenAi Key not configured")
    }

    if (!messages) {
      return new NextResponse("Messages are required", {status: 400})
    }

    const freeTrial = await checkApiLimit()

    if(!freeTrial){
      return new NextResponse('free trial has expired', {status: 403})
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });

    await incrementApiLimit()
    return NextResponse.json(response.choices[0].message)
  } catch(error) {
    console.log('conversation err', error)
    return new NextResponse ("Internal error", {status: 500})
  }
}