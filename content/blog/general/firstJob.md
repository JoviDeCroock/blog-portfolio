---
title: Quitting my first job
date: '2019-06-16T14:00:03.284Z'
subject: General
readTime: 6
published: true
---

## The job

Recently I've quit my first job, I see this as a good time to reflect on my close to two years as a web- and mobile engineer. I've come quite far both in the hard- and soft skills department.
I hope this can be an insight to others and help identify thinking errors.

For two years I was a consultant developer, the main programming language was JavaScript and we used React.JS on the front-end and Node.JS on the backend.
I mainly resided at one client which was one of the best places for a person looking for challenges like myself. We've built a lot of awesome stuff but I'm not going to talk about that in this post.

## Hard skills

Learnings that involve coding.

### Clean coding

Giving functions and variables good and clear names can be one of the hardest tasks we deal with on a daily base. It all sounds really straight forward when we're writing a small application but after a certain time or in certain functions it can get really tedious.

Something I've definitely learned in this process is that when you're not sure about a certain name, ask it to the person sitting next to you. If that person doesn't understand it by glancing at your code someone else won't either. You can ask for advice and take your learnings. Next time someone reads it you'll be sure that you've chosen a better name than you initially would.

### Comments are not everything

We can write a dozen of comments but come on... Who updates these things... I agree that a comment can help with implementing a certain function, you describe steps for yourself and the person after you. That way you share your thought process with the person that has to solve a bug or whatever, this however makes you trust the next person to update your comments to reflect the changes made. When this isn't done the person after that could get really confused.

I'm all for comments in hard functions don't get me wrong but that's two places you should maintain when altering that function instead of one.
The lesson I'm trying to express here is that you first have to see that everything has clear names and only when that is present and it's not clear you should start writing comments. Business logic is one of these things that can cause complexity and won't regularly change, this makes it worth commenting.

### Co-programming

One of the things I've learned to enjoy most is co-programming, not in the most strict way. I like it when you can bounce idea's at each other, person 1 says x person 2 says y and try it out. You get a view of how people debug and perceive errors.

All people have diverse mindsets when it comes to problem solving, even something that is as logical as problem solving knows hundreds of solutions. This means that we will be able to learn more productive solutions from one another.

Another positive here is that you'll see parts of the codebase that you otherwise would not touch. I myself noticed this problem sometimes where people didn't know parts I'd written with extensive amounts of business logic, this leads to frustration when they have to work on that part.

## Soft skills

### Assessing knowledge

When I started out I was really chaotic when explaining something and always assumed a certain level of knowledge about the subject I was talking about. This is one of the worst assumptions a person can make, I don't know how I made a thinking mistake like that. There are so many subjects in technology I know nothing about, if someone would have to explain an advanced subject in these they'd lose me 100% as well.

However, this is no uncommon thinking error. One of the hardest things we have to do commonly is put ourselves as a third person in the conversation. Evaluate the conversation/mentoring you're giving and think about it as the person receiving it as well as think about it as an outsider listening in.

I think that this is one of the most valuable learnings I've had in a while. It enables me to write better documentation, formulate my answers to questions better and talk clearer.

### Severity is a curse on oneself

I've always had high expectations of myself these often lead to their own issues, something I definitely learned is that these are self-imposed. You should not reflect your own expectations on another person just because they are superior to you.
Reflecting expectations that you impose on yourself on another can lead to frustration and fear of asking questions. When someone doesn't like asking you questions an alarm bell should start ringing so loud.
I'm not saying that if everyone keeps asking you questions that you shouldn't do something about it but that's something you should judge for yourself.

Technology is so much more broad than just performing in a skill-based profession, it's about communication and learning from each other. A lack of communication with your team can lead to others working on the same bug, ... as you are working on. A lack of communication with the business side leads to non-concrete features and often need a lot of changes when released.

### Agile work

During college I've always been sceptical about agile and the overhead it brings. This is something I've completely grown out of, agile is a wondrous working method to ensure the client gets what the client wants.

Agile work can be quite opinionated so I'll shortly describe how we worked. Our sprints lasted two weeks, once every two weeks we had a ceremony day this consisted of our demo to the clients, a retrospective and planning the next sprint. I've always enjoyed these ceremonies since the demo is a little pat on the back for the whole team and the retrospective allows you to vent things that are taking their toll on you.

I do think that story points in general are a non-optimal measuring unit, I know that we need a way to tell the business what feature holds what value but... It's not fair in the case where we judge a ticket on complexity we effectively say hey this is not complex or hey this is complex. Someone new in the team could take said ticket and feel inferior. The new team member should've been involved in the process of measuring this ticket but most newer people get overruled by the mass.

### Comfort zone

A lot of companies seem to reside in some kind of comfort zone, they're open for new things but won't introduce the new things themselves. It should be a careful evaluation of pro's and cons. I myself am someone who likes new things that improve in some aspects, most of the time I have already evaluated these myself and see potential or don't see potential.

Let's approach this by example, I am heavily in favour of MobX due to its performant nature I thought why let new people worry about performance when they can first learn everything else? This seemed to be a bad decision since people had no idea how to efficiently scale MobX. This could be devoted to me being too little involved in their first project but that's the nature of consultancy I suppose.

I've learned that when you want to bring forth something new it should be a clear cut, one of the things I introduced that went smooth for example was TypeScript (yes before the hype.) it does not force the dev to alter thinking processes. It just helps the dev out.

In no way was this meant to come of as belittling or whatever, it's meant to shed some light on how hard it can be to decide what is worth introducing and what is not.
The Development-cycle has to be able to stay consistent for the clients, the quality of the software should remain and the quality of the code should remain.

## General learnings

### Performance

Not everyone is concerned with it, I know that this is a commonly discussed topic but I genuinely believe that if some companies would be able to see their bailout numbers of people on phones/bad internet countries they'd be shocked.

I know that you need measurements to effectively tell the business we need to do something about it but people that stop loading the website because it's several MiB of JS coming in on their slow connection aren't accounted for by Google Analytics and others. You need to effectively be present on the website for these to properly display solid information.

There are solutions for this but I think it's problematic thinking, global applications should be globally accessible. This is not applicable for inhouse business applications.

## Conclusion

Work is a learning process and I as a developer have evolved tremendously in the last two years. I'm happy about the experiences I had and the people I met, now I'm looking at what the future holds for me.
