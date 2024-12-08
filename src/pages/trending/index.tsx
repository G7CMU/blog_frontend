import ListBlog from "@/components/contents/list-blog";
import {GetServerSideProps} from "next";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import {parse} from "cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MenuBar from "@/components/menu-bar";
import {withAuth} from "@/utils/authGuard";
import React from "react";

type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
};


const TrendingPage: React.FC<TrendingPageProps> = ({Blogs, error}) => {
    return (
        <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
            <title>Trending</title>
            <div className={"flex md:w-1/3"}>
                <MenuBar isResponsive={false} defaultSelected={'2'}/>
            </div>
            <ListBlog Blogs={Blogs}/>
            <div className={"flex md:w-1/3"}></div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale, req}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    try {
        const response = await userApiInstance.get(`/feed/top30`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        const data = response.data;
        const Blogs: BlogType[] = data.map((blog: any) => {
            return {
                id: blog.id,
                title: blog.title,
                body: blog.body,
                upvote: blog.upvote,
                downvote: blog.downvote,
                createdAt: blog.createdAt,
                user: {
                    fullname: blog.user.fullname,
                },
            };
        });

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
                Blogs,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);

        return {
            props: {
                Blogs: null,
                error: 'Could not fetch the post. Please try again later.',
            },
        };
    }
});


export default TrendingPage;
